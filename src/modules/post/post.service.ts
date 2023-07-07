import { Injectable, NotFoundException } from '@nestjs/common';
import { Post } from '@prisma/client';
import { PostDto } from './types/post-dto';
import { formatISO } from 'date-fns';
import { FeedDto } from './types/feed-dto';
import { PrismaService } from '../prisma/prisma.service';
import { FeedItem } from './types/feed-item';
import { PinoLogger } from 'nestjs-pino';
import { JwtStrategyPayload } from '../auth/types/jwt-strategy-payload-type';
import { getFeedQuery } from './sql/getFeed';
import { VoteDto } from './types/vote-dto';
import { VoteType } from './types/vote-type';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService, private logger: PinoLogger) {}
  async fetch(id: string): Promise<Post> {
    try {
      return await this.prisma.post.findUnique({
        where: { id },
        rejectOnNotFound: () => new NotFoundException(),
      });
    } catch (e) {
      const message = 'Failed to fetch post';
      this.logger.error(e, message);
      throw e;
    }
  }

  async getFeed(user: JwtStrategyPayload, dto: FeedDto): Promise<FeedItem[]> {
    const { userId } = user;
    try {
      return await this.prisma.$queryRaw<FeedItem[]>(
        getFeedQuery({ userId, ...dto }),
      );
    } catch (e) {
      const message = 'Failed to fetch posts';
      this.logger.error(e, message);
      throw e;
    }
  }

  async create(dto: PostDto) {
    const { body, userId, latitude, longitude } = dto;
    try {
      return await this.prisma.post.create({
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
          votes: true,
        },
      });
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
      // await this.prisma.vote.deleteMany({
      //   where: {
      //     postId,
      //     userId,
      //   },
      // });
      await this.prisma.vote.update({
        where: {
          postId_userId: { postId, userId },
        },
        data: {
          upvoted: determineUpvoteState(),
          downvoted: determineDownvoteState(),
        },
      });
      // await this.prisma.vote.upsert({
      //   where: {
      //     postId_userId
      //   },
      //   create: {
      //     upvoted: type === VoteStatus.UPVOTED,
      //     downvoted: type === VoteStatus.DOWNVOTED,
      //     userId,
      //     postId,
      //   },
      //   update: {
      //     upvoted: type === VoteStatus.UPVOTED,
      //     downvoted: type === VoteStatus.DOWNVOTED,
      //     userId,
      //   },
      // });
    } catch (e) {
      const message = 'Failed to fetch posts';
      this.logger.error(e, message);
      throw e;
    }
  }
}
