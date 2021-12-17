import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { RolesGuard } from '../guards/roles.guard';
import { JwtAuthGuard } from '../guards/auth.guard';

import { RoleType } from '../../user/entities/user.entity';

export function GlobalAuthorization(...roles: RoleType[]) {
  return applyDecorators(
    ApiBearerAuth(),
    SetMetadata('roles', roles),
    UseGuards(JwtAuthGuard, RolesGuard),
  );
}
