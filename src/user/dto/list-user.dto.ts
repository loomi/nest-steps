import { IsOptional, IsString } from "class-validator";

export class ListUserDto {
  @IsOptional()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  aboutMe: string;
}
