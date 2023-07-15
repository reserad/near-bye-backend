import { Injectable } from '@nestjs/common';
import { UserCreateDto } from './types/user-create-dto';
import { formatISO } from 'date-fns';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { PinoLogger } from 'nestjs-pino';
import { UserUpdateDto } from './types/user-update-dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService, private logger: PinoLogger) {}
  async fetch(phoneNumber: string): Promise<User> {
    try {
      return await this.prisma.user.findUniqueOrThrow({
        where: { phoneNumber },
      });
    } catch (e) {
      const message = 'Failed to fetch user';
      this.logger.error(e, message);
      throw e;
    }
  }

  async create(userDto: UserCreateDto): Promise<User> {
    const { phoneNumber } = userDto;
    try {
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
    } catch (e) {
      const message = 'Failed to create user';
      this.logger.error(e, message);
      throw e;
    }
  }

  async update(id: string, userDto: UserUpdateDto): Promise<User> {
    try {
      return await this.prisma.user.update({
        where: {
          id,
        },
        data: {
          ...userDto,
        },
      });
    } catch (e) {
      const message = 'Failed to update user';
      this.logger.error(e, message);
      throw e;
    }
  }
}
