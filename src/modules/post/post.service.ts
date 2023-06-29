import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Post } from '@prisma/client';
import { PostDto } from './types/post-dto';
import { formatISO } from 'date-fns';
import { GeographyService } from 'src/utils/geography-service';
import { PostFetchAllDto } from './types/post-fetch-all-dto';
import { PrismaService } from '../prisma/prisma.service';
import { PostResponse } from './types/post-response';

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
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        console.error(e.message);
        throw e;
      }
    }
  }

  async create(dto: PostDto): Promise<Post> {
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
      });
    } catch (e) {
      console.log(e);
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        console.error(e.code);
        throw e;
      }
    }
  }
}
