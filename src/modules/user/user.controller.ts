import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './types/user-dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getCurrentUser() {
    //return await this.au
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
