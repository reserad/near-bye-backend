import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { GeographyModule } from 'src/shared/utils/geography-module';

@Module({
  imports: [PrismaModule, GeographyModule],
  controllers: [PostController],
  providers: [PostService],
  exports: [PrismaModule],
})
export class PostModule {}
