import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

import { LoginDto } from './dto/login.dto';
import { LoginGmailDto } from './dto/login-gmail.dto';
import { LoginFacebookDto } from './dto/login-facebook.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'login user' })
  @HttpCode(HttpStatus.OK)
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('login/gmail')
  @ApiOperation({ summary: 'login with gmail' })
  @HttpCode(HttpStatus.OK)
  loginWithGmail(@Body() loginGmailDto: LoginGmailDto) {
    return this.authService.loginWithGmail(loginGmailDto);
  }

  @Post('login/facebook')
  @ApiOperation({ summary: 'login with facebook' })
  @HttpCode(HttpStatus.OK)
  loginWithFacebook(@Body() loginFacebookDto: LoginFacebookDto) {
    return this.authService.loginWithFacebook(loginFacebookDto);
  }

  @Post('forgot-password')
  @ApiOperation({ summary: 'forgot password' })
  @HttpCode(HttpStatus.OK)
  forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto);
  }

  @Post('refresh-token')
  @ApiOperation({ summary: 'refresh token' })
  @HttpCode(HttpStatus.OK)
  refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto);
  }
}
