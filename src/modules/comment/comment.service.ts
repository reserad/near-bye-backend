import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PinoLogger } from 'nestjs-pino';
import { Comment } from '@prisma/client';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService, private logger: PinoLogger) {}
  async fetch(id: string): Promise<Comment> {
    try {
      const comment = await this.prisma.comment.findUnique({
        where: { id },
        include: {
          author: true,
          parent: {
            include: {
              author: true,
            },
          },
          children: {
            include: {
              author: true,
              children: {
                include: {
                  author: true,
                },
              },
            },
          },
        },
        rejectOnNotFound: () => new NotFoundException(),
      });

      return comment;
    } catch (e) {
      const message = 'Failed to fetch post';
      this.logger.error(e, message);
      throw e;
    }
  }
}
