import { Injectable } from '@nestjs/common';
import { UserDto } from './types/user-dto';
import { formatISO } from 'date-fns';
import { PrismaService } from '../prisma/prisma.service';
import { User } from './types/user.type';
import { mapPrismaUser } from './utils/user-prisma-mapper';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async fetch(phoneNumber: string): Promise<User> {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: { phone_number: phoneNumber },
    });
    return mapPrismaUser(user);
  }

  async create(userDto: UserDto): Promise<User> {
    const { phoneNumber } = userDto;
    const user = await this.prisma.user.upsert({
      where: {
        phone_number: phoneNumber,
      },
      create: {
        phone_number: phoneNumber,
        created_at: formatISO(new Date()),
      },
      update: {},
    });

    return mapPrismaUser(user);
  }
}
