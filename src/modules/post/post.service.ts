import { Injectable, NotFoundException } from '@nestjs/common';
import { Post } from '@prisma/client';
import { PostDto } from './types/post-dto';
import { formatISO } from 'date-fns';
import { GeographyService } from 'src/utils/geography-service';
import { PostFetchAllDto } from './types/post-fetch-all-dto';
import { PrismaService } from '../prisma/prisma.service';
import { PostResponse } from './types/post-response';
import { PinoLogger } from 'nestjs-pino';

@Injectable()
export class PostService {
  constructor(
    private prisma: PrismaService,
    private geographyService: GeographyService,
    private logger: PinoLogger,
  ) {}
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

  async fetchAll(dto: PostFetchAllDto): Promise<PostResponse[]> {
    const { latitude, longitude } = dto;
    try {
      const geoQuery = await this.geographyService.getPostsWithinProximity(
        longitude,
        latitude,
      );
      return await this.prisma.post.findMany({
        where: {
          id: {
            in: geoQuery.map(({ id }) => id),
          },
        },
        include: {
          author: {
            include: {
              profile: true,
            },
          },
        },
        orderBy: [{ createdAt: 'desc' }],
      });
    } catch (e) {
      const message = 'Failed to fetch posts';
      this.logger.error(e, message);
      throw e;
    }
  }

  async create(dto: PostDto): Promise<PostResponse> {
    const { body, userId, latitude, longitude } = dto;
    try {
      return await this.prisma.post.create({
        data: {
          body,
          authorId: userId,
          createdAt: formatISO(new Date()),
          latitude,
          longitude,
        },
        include: {
          author: {
            include: {
              profile: true,
            },
          },
        },
      });
    } catch (e) {
      const message = 'Failed to create post';
      this.logger.error(e, message);
      throw e;
    }
  }
}
