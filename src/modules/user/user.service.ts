import { Injectable } from '@nestjs/common';
import { UserDto } from './types/user-dto';
import { formatISO } from 'date-fns';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { PinoLogger } from 'nestjs-pino';

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

  async create(userDto: UserDto): Promise<User> {
    const { phoneNumber } = userDto;
    try {
      return await this.prisma.user.upsert({
        where: {
          phoneNumber,
        },
        create: {
          phoneNumber,
          createdAt: formatISO(new Date()),
          profile: {
            create: {},
          },
        },
        update: {},
      });
    } catch (e) {
      const message = 'Failed to create user';
      this.logger.error(e, message);
      throw e;
    }
  }
}
