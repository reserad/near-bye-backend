import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { OtpRequestDto } from './dto/otp-request-dto';
import { OtpVerifyDto } from './dto/otp-verify-dto';
import { UserService } from '../user/user.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('/send')
  async sendOtp(@Body() otpRequestDto: OtpRequestDto) {
    const user = await this.userService.create(otpRequestDto);
    return await this.authService.sendOtp(user.phoneNumber);
  }

  @Post('/verify')
  async verifyOtp(@Body() otpVerifyDto: OtpVerifyDto) {
    const { phoneNumber, code } = otpVerifyDto;
    return await this.authService.verifyOtp(phoneNumber, code);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/sign-out')
  async signOut() {
    return true;
    //return await this.authService.signOut(tokenId));
  }
}
