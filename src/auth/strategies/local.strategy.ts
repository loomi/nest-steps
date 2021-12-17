import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {
    super();
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.login(email, password);
    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }

    return {
      user,
    };
  }
}
