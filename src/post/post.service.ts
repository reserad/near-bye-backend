import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, post as Post } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostDto } from './types/post-dto';
import { formatISO } from 'date-fns';
import { GeographyService } from 'src/shared/utils/geography-service';
import { PostFetchAllDto } from './types/post-fetch-all-dto';

@Injectable()
export class PostService {
  constructor(
    private prisma: PrismaService,
    private geographyService: GeographyService,
  ) {}
  async fetch(id: string): Promise<Post> {
    try {
      return await this.prisma.post.findUnique({
        where: { id },
        rejectOnNotFound: () => new NotFoundException(),
      });
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async fetchAll(dto: PostFetchAllDto): Promise<Post[]> {
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
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        console.error(e);
        throw e;
      }
    }
  }

  async create(dto: PostDto): Promise<Post> {
    const { body, title, userId, latitude, longitude } = dto;
    try {
      return await this.prisma.post.create({
        data: {
          body,
          title,
          user_id: userId,
          created_at: formatISO(new Date()),
          latitude,
          longitude,
        },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        console.error(e.code);
        throw new Error('Error creating post');
      }
    }
  }
}
