import { Injectable } from '@nestjs/common';
import { user as User } from '@prisma/client';
import { UserDto } from './types/user-dto';
import { formatISO } from 'date-fns';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async fetch(phoneNumber: string): Promise<User> {
    return await this.prisma.user.findUniqueOrThrow({
      where: { phone_number: phoneNumber },
    });
  }

  async create(userDto: UserDto): Promise<User> {
    const { phoneNumber } = userDto;
    return await this.prisma.user.upsert({
      where: {
        phone_number: phoneNumber,
      },
      create: {
        phone_number: phoneNumber,
        created_at: formatISO(new Date()),
      },
      update: {},
    });
  }
}
