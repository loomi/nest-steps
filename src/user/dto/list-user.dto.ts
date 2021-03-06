import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator';

import { RoleType, roleTypeArray } from '../entities/user.entity';

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

  @ApiProperty({ required: false })
  @IsOptional()
  @Transform(({ value }) => (value === 'true' ? true : false))
  @IsBoolean()
  count?: boolean;

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
