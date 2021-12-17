import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserRepository } from '../user/user.repository';

import { ServiceException } from '../shared/errors/service.exception';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string): Promise<any> {
    const [user] = await this.userRepository.list({ email, password });
    if (!user || user.password !== password) {
      throw new ServiceException('Auth', 'Credencial Inválida.');
    }

    const { password: _, ...userWithOutPassword } = user;

    const payload = { email: user.email, role: user.role, sub: user.id };
    const access_token = this.jwtService.sign(payload);

    return {
      access_token,
      user: userWithOutPassword,
    };
  }
}
