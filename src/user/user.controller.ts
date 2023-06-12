import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './types/user-dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  blah() {
    return 'HI THERE';
  }

  @Get(':phoneNumber')
  async fetch(@Param('phoneNumber') phoneNumber: string) {
    return await this.userService.fetch(phoneNumber);
  }

  @Post()
  async create(@Body() userDto: UserDto) {
    return await this.userService.create(userDto);
  }
}
