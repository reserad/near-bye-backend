import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './types/user-dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getCurrentUser(@Headers('Authorization') auth: any) {
    return await this.userService.fetch('9376710051');
  }

  @UseGuards(JwtAuthGuard)
  @Get(':phoneNumber')
  async fetch(@Param('phoneNumber') phoneNumber: string) {
    return await this.userService.fetch(phoneNumber);
  }

  @Post()
  async create(@Body() userDto: UserDto) {
    return await this.userService.create(userDto);
  }
}
