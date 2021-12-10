import { Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';

import { UploadFileDto } from './dto/upload-file.dto';

import { ServiceException } from '../shared/errors/service.exception';

@Injectable()
export class FileService {
  private AWS_S3_BUCKET: string;
  private s3: S3;

  constructor(private configService: ConfigService) {
    this.AWS_S3_BUCKET = this.configService.get<string>('AWS_BUCKET_NAME');
    this.s3 = new S3({
      accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get<string>('AWS_ACCESS_KEY_SECRET'),
      region: this.configService.get<string>('AWS_REGION'),
    });
  }

  async uploadFile({ buffer, path }: UploadFileDto): Promise<string | void> {
    const hash = randomBytes(16).toString('hex').replace(/\//gi, '-');

    const location = await this.s3
      .upload({
        Bucket: this.AWS_S3_BUCKET,
        Key: `${path}/${hash}`,
        Body: buffer,
      })
      .promise()
      .then((response) => {
        return response.Location;
      })
      .catch(() => {
        throw new ServiceException('File', 'erro ao tentar criar arquivo.');
      });

    return location;
  }

  async deleteFile(key: string): Promise<void> {
    const hash = randomBytes(16).toString('hex').replace(/\//gi, '-');

    const s3Response = await this.s3
      .deleteObject({
        Bucket: this.AWS_S3_BUCKET,
        Key: key,
      })
      .promise()
      .then((response) => {
        return null;
      })
      .catch(() => {
        throw new ServiceException('File', 'erro ao tentar deletar arquivo.');
      });

    return s3Response;
  }
}
