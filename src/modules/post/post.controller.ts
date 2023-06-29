import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { PostDto } from './types/post-dto';
import { PostFetchAllDto } from './types/post-fetch-all-dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async fetch(@Param('id') id: string) {
    return await this.postService.fetch(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async fetchAll(@Body() dto: PostFetchAllDto) {
    console.log('DTO: ', dto);
    return await this.postService.fetchAll(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() dto: PostDto) {
    return await this.postService.create(dto);
  }
}
