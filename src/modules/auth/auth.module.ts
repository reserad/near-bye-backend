import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { UserService } from '../user/user.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [ConfigModule, LoggerModule, PrismaModule, PassportModule],
  controllers: [],
  providers: [UserService, JwtStrategy],
})
export class AuthModule {}
