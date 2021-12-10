import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { RolesType } from '../entities/user.entity';
export class CreateUserDto {
  @ApiProperty({ required: true })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => (typeof value === 'string' ? value?.trim() : value))
  password: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => (typeof value === 'string' ? value?.trim() : value))
  name: string;

  @ApiProperty({
    required: true,
    default: RolesType[RolesType.COMMON],
    enum: Object.keys(RolesType).filter((role) => isNaN(Number(role))),
  })
  @IsEnum(RolesType)
  @Transform(({ value }) => (typeof value === 'string' ? value?.trim() : value))
  role: RolesType;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => (typeof value === 'string' ? value?.trim() : value))
  aboutMe?: string;
}
