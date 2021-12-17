import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

import { RoleType, roleTypeArray } from '../entities/user-info.entity';

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
    default: roleTypeArray[0],
    enum: roleTypeArray,
  })
  role?: RoleType;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  aboutMe?: string;
}
