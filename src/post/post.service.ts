import { Injectable } from '@nestjs/common';
import { Prisma, post as Post } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostDto } from './types/post-dto';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}
  async fetch(id: string): Promise<Post> {
    try {
      return await this.prisma.post.findFirst({
        where: { id },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        console.error(e.code);
        throw new Error('Error fetching post');
      }
    }
  }

  async fetchAll(): Promise<Post[]> {
    try {
      return await this.prisma.post.findMany({
        where: {},
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        console.error(e.code);
        throw new Error('Error fetching posts');
      }
    }
  }

  // async create(postDto: PostDto): Promise<Post> {
  //   const {} = postDto;
  //   try {
  //     return await this.prisma.post.upsert({
  //       where: {},
  //       create: { ...postDto },
  //       update: {},
  //     });
  //   } catch (e) {
  //     if (e instanceof Prisma.PrismaClientKnownRequestError) {
  //       console.error(e.code);
  //       throw new Error('Error creating post');
  //     }
  //   }
  // }
}