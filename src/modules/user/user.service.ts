import { Injectable } from '@nestjs/common';
import { UserDto } from './types/user-dto';
import { formatISO } from 'date-fns';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async fetch(phoneNumber: string): Promise<User> {
    return await this.prisma.user.findUniqueOrThrow({
      where: { phoneNumber },
    });
  }

  async create(userDto: UserDto): Promise<User> {
    const { phoneNumber } = userDto;
    return await this.prisma.user.upsert({
      where: {
        phoneNumber,
      },
      create: {
        phoneNumber,
        createdAt: formatISO(new Date()),
      },
      update: {},
    });
  }
}
