import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (user.userInfo) {
      const forAll = roles.includes('all');
      const authorizedUser = roles.includes(user.userInfo.role);
      if (authorizedUser || forAll) {
        return true;
      }
    }
    throw new HttpException(
      'Você não tem autorização para acessar essa rota.',
      HttpStatus.FORBIDDEN,
    );
  }
}
