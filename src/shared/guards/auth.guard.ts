import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';

import { UserService } from '@/src/user/user.service';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;

    if (authorization) {
      const [, token] = authorization.split('Bearer ');
      const user = await this.userService.verifyToken(token).catch(() => {
        throw new HttpException('Token inválido', HttpStatus.FORBIDDEN);
      });
      if (user) {
        request.user = user;
        return true;
      }
    }

    throw new HttpException('Token inválido', HttpStatus.FORBIDDEN);
  }
}
