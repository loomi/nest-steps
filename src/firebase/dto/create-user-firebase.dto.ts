import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserFirebaseDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
