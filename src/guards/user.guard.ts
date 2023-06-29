import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtStrategyPayload } from 'src/modules/auth/types/jwt-strategy-payload-type';

export const User = createParamDecorator(
  (data: any, ctx: ExecutionContext): JwtStrategyPayload => {
    const request = ctx.switchToHttp().getRequest();
    const user: JwtStrategyPayload = request.user;
    return user;
  },
);
