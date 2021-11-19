import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";


export class CreateUserDto {
  
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => (typeof value === "string")? value?.trim() : value)
  password: string;

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => (typeof value === "string")? value?.trim() : value)
  name: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => (typeof value === "string")? value?.trim() : value)
  aboutMe: string;
}
