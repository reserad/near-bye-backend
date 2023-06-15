import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { PostDto } from './types/post-dto';
import { PostFetchAllDto } from './types/post-fetch-all-dto';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get(':id')
  async fetch(@Param('id') id: string) {
    return await this.postService.fetch(id);
  }

  @Get()
  async fetchAll(@Body() dto: PostFetchAllDto) {
    return await this.postService.fetchAll(dto);
  }

  @Post()
  async create(@Body() dto: PostDto) {
    return await this.postService.create(dto);
  }
}
