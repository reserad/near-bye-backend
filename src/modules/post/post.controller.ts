import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { PostDto } from './types/post-dto';
import { FeedDto } from './types/feed-dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { JwtStrategyPayload } from '../auth/types/jwt-strategy-payload-type';
import { User } from 'src/guards/user.guard';
import { VoteDto } from './types/vote-dto';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async fetch(@User() user: JwtStrategyPayload, @Param('id') id: string) {
    return await this.postService.fetch(user, id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getFeed(@User() user: JwtStrategyPayload, @Body() dto: FeedDto) {
    return await this.postService.getFeed(user, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() dto: PostDto) {
    return await this.postService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/vote')
  async vote(@User() user: JwtStrategyPayload, @Body() dto: VoteDto) {
    return await this.postService.vote(user, dto);
  }
}
