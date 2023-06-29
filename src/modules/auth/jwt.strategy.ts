import { PassportStrategy } from '@nestjs/passport';
import { JwtPayloadType } from './types/jwt-payload-type';
import { JwtStrategyPayload } from './types/jwt-strategy-payload-type';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_PUBLIC_KEY'),
    });
  }

  async validate(payload: JwtPayloadType): Promise<JwtStrategyPayload> {
    const { userId, phoneNumber } = payload;
    return {
      userId,
      phoneNumber,
    };
  }
}
