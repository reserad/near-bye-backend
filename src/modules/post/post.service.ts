import { Injectable, NotFoundException } from '@nestjs/common';
import { PostDto } from './types/post-dto';
import { formatISO } from 'date-fns';
import { FeedDto } from './types/feed-dto';
import { PrismaService } from '../prisma/prisma.service';
import { PinoLogger } from 'nestjs-pino';
import { JwtStrategyPayload } from '../auth/types/jwt-strategy-payload-type';
import { getPostsInProximity } from './sql/getPostsInProximity';
import { VoteDto } from './types/vote-dto';
import { VoteType } from './types/vote-type';
import { UserPost } from './types/user-post';
import { buildUserPost } from './utils/buildUserPost';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService, private logger: PinoLogger) {}
  async fetch(user: JwtStrategyPayload, id: string): Promise<UserPost> {
    const { userId } = user;
    try {
      const post = await this.prisma.post.findUnique({
        where: { id },
        include: {
          author: true,
          comments: {
            include: {
              author: true,
            },
          },
          votes: true,
        },
        rejectOnNotFound: () => new NotFoundException(),
      });

      return buildUserPost(post, userId);
    } catch (e) {
      const message = 'Failed to fetch post';
      this.logger.error(e, message);
      throw e;
    }
  }

  async getFeed(user: JwtStrategyPayload, dto: FeedDto): Promise<UserPost[]> {
    const { userId } = user;
    try {
      const postIdsInProximity = await this.prisma.$queryRaw<{ id: string }[]>(
        getPostsInProximity({ ...dto }),
      );
      const posts = await this.prisma.post.findMany({
        where: {
          id: {
            in: postIdsInProximity.map(({ id }) => id),
          },
        },
        include: {
          author: true,
          comments: {
            include: {
              author: true,
            },
          },
          votes: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      return posts.map(post => {
        return buildUserPost(post, userId);
      });
    } catch (e) {
      const message = 'Failed to fetch posts';
      this.logger.error(e, message);
      throw e;
    }
  }

  async create(dto: PostDto): Promise<UserPost> {
    const { body, userId, latitude, longitude } = dto;
    try {
      const post = await this.prisma.post.create({
        data: {
          body,
          authorId: userId,
          createdAt: formatISO(new Date()),
          latitude,
          longitude,
          votes: {
            create: {
              userId,
            },
          },
        },
        include: {
          author: true,
          comments: {
            include: {
              author: true,
            },
          },
          votes: true,
        },
      });
      return buildUserPost(post, userId);
    } catch (e) {
      const message = 'Failed to create post';
      this.logger.error(e, message);
      throw e;
    }
  }

  async vote(user: JwtStrategyPayload, dto: VoteDto): Promise<void> {
    const { userId } = user;
    const { type, postId } = dto;
    try {
      const previousVote = await this.prisma.vote.findFirst({
        where: {
          postId,
          userId,
        },
      });

      if (previousVote) {
        const determineUpvoteState = () => {
          switch (type) {
            case VoteType.DOWNVOTE:
              return false;
            case VoteType.UPVOTE:
              if (previousVote.upvoted) {
                return false;
              }
              return true;
            default:
              return false;
          }
        };

        const determineDownvoteState = () => {
          switch (type) {
            case VoteType.UPVOTE:
              return false;
            case VoteType.DOWNVOTE:
              if (previousVote.downvoted) {
                return false;
              }
              return true;
            default:
              return false;
          }
        };
        await this.prisma.vote.upsert({
          where: {
            postId_userId: { postId, userId },
          },
          create: {
            upvoted: determineUpvoteState(),
            downvoted: determineDownvoteState(),
            userId,
            postId,
          },
          update: {
            upvoted: determineUpvoteState(),
            downvoted: determineDownvoteState(),
          },
        });
      } else {
        await this.prisma.vote.create({
          data: {
            upvoted: type === VoteType.UPVOTE,
            downvoted: type === VoteType.DOWNVOTE,
            userId,
            postId,
          },
        });
      }
    } catch (e) {
      const message = 'Failed to fetch posts';
      this.logger.error(e, message);
      throw e;
    }
  }
}
