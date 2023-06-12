import { Injectable } from '@nestjs/common';
import { Prisma, user as User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from './types/user-dto';
import { formatISO } from 'date-fns';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async fetch(phoneNumber: string): Promise<User> {
    try {
      return await this.prisma.user.findFirst({
        where: { phone_number: phoneNumber },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        console.error(e.code);
        throw new Error('Error fetching user');
      }
    }
  }

  async create(userDto: UserDto): Promise<User> {
    const { phoneNumber, baseLatitude, baseLongitude } = userDto;
    try {
      return await this.prisma.user.upsert({
        where: {
          phone_number: phoneNumber,
        },
        create: {
          phone_number: phoneNumber,
          created_at: formatISO(new Date()),
          base_lattitude: baseLatitude,
          base_longitude: baseLongitude,
        },
        update: {},
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        console.error(e.code);
        throw new Error('Error creating user');
      }
    }
  }
}
