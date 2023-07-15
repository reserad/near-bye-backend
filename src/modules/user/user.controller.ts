import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserCreateDto } from './types/user-create-dto';
import { UserUpdateDto } from './types/user-update-dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from 'src/guards/user.guard';
import { JwtStrategyPayload } from '../auth/types/jwt-strategy-payload-type';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getCurrentUser(@User() user: JwtStrategyPayload) {
    return await this.userService.fetch(user.phoneNumber);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':phoneNumber')
  async fetch(@Param('phoneNumber') phoneNumber: string) {
    return await this.userService.fetch(phoneNumber);
  }

  @Post()
  async create(@Body() userDto: UserCreateDto) {
    return await this.userService.create(userDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async update(
    @User() user: JwtStrategyPayload,
    @Body() userDto: UserUpdateDto,
  ) {
    return await this.userService.update(user.userId, userDto);
  }
}
