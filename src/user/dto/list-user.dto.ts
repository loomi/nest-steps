import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

import { RolesType } from '../entities/user.entity';

export class ListUserDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsUUID()
  id?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    required: false,
    default: RolesType[RolesType.COMMON],
    enum: Object.keys(RolesType).filter((role) => isNaN(Number(role))),
  })
  role?: RolesType;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  aboutMe?: string;
}
