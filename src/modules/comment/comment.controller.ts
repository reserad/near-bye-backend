import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { JwtStrategyPayload } from '../auth/types/jwt-strategy-payload-type';
import { User } from 'src/guards/user.guard';

@Controller('comments')
export class CommentController {
  constructor(private readonly commmentService: CommentService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async fetch(@User() user: JwtStrategyPayload, @Param('id') id: string) {
    return await this.commmentService.fetch(id);
  }
}
