import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { PostDto } from './types/post-dto';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get(':id')
  async fetch(@Param('id') id: string) {
    return await this.postService.fetch(id);
  }

  @Post()
  async create(@Body() postDto: PostDto) {
    return 'hello';
    //return await this.postService.create(postDto);
  }
}
