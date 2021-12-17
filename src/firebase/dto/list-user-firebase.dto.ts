import { IsString } from 'class-validator';

export class ListUserFirebaseDto {
  @IsString()
  id?: string;

  @IsString()
  email?: string;
}
