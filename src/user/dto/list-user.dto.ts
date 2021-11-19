import { IsOptional, IsString, IsUUID } from "class-validator";

export class ListUserDto {
  
  @IsOptional()
  @IsUUID()
  id: string;

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
