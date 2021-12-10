import { IsNotEmpty, IsString } from 'class-validator';

export class UploadFileDto {
  @IsNotEmpty()
  buffer: any;

  @IsString()
  path?: string;
}
