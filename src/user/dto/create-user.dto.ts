import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { RoleType, roleTypeArray } from '../entities/user-info.entity';
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
    default: roleTypeArray[0],
    enum: roleTypeArray,
  })
  @IsIn(roleTypeArray)
  @Transform(({ value }) => (typeof value === 'string' ? value?.trim() : value))
  role: RoleType;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => (typeof value === 'string' ? value?.trim() : value))
  aboutMe?: string;
}
