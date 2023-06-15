import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { GeographyModule } from 'src/utils/geography-module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule, GeographyModule],
  controllers: [PostController],
  providers: [PostService],
  exports: [PrismaModule],
})
export class PostModule {}
