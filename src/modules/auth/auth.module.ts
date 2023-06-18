import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { ApiModule } from '../api/api.module';
import { LoggerModule } from 'nestjs-pino';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    ConfigModule,
    ApiModule,
    LoggerModule,
    PrismaModule,
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, JwtStrategy],
})
export class AuthModule {}
