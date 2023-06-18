import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { ApiService } from '../api/api.service';
import { JwtToken } from './types/jwt-token-type';

@Injectable()
export class AuthService {
  constructor(
    @InjectPinoLogger(AuthService.name)
    private readonly logger: PinoLogger,
    private readonly configService: ConfigService,
    private readonly apiService: ApiService,
  ) {}

  private baseUrl = this.configService.get<string>('AUTH_SERVICE_URL');

  private endPoints = {
    auth: `${this.baseUrl}/auth`,
  };

  async sendOtp(phoneNumber: string) {
    try {
      await this.apiService.post(`${this.endPoints.auth}/send`, {
        data: { phoneNumber },
      });
    } catch (e) {
      const message = 'Failed to send OTP';
      this.logger.error(message, e);
      throw e;
    }
  }

  async verifyOtp(phoneNumber: string, code: string) {
    try {
      return await this.apiService.post<JwtToken>(
        `${this.endPoints.auth}/verify`,
        {
          data: {
            phoneNumber,
            code,
          },
        },
      );
    } catch (e) {
      const message = 'Invalid code';
      this.logger.error(message, e);
      throw new HttpException(
        { statusCode: HttpStatus.NOT_FOUND, message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
