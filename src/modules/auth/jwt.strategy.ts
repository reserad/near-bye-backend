import { PassportStrategy } from '@nestjs/passport';
import { JwtPayloadType } from './types/jwt-payload-type';
import { JwtStrategyPayload } from './types/jwt-strategy-payload-type';
import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../user/user.service';
import { PinoLogger } from 'nestjs-pino';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly userService: UserService,
    private logger: PinoLogger,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_PUBLIC_KEY'),
    });
  }

  async validate(payload: JwtPayloadType): Promise<JwtStrategyPayload> {
    const { userId, phoneNumber } = payload;
    try {
      await this.userService.fetch(phoneNumber);
    } catch (err) {
      this.logger.error(err);
      throw new UnauthorizedException();
    }
    return {
      userId,
      phoneNumber,
    };
  }
}
