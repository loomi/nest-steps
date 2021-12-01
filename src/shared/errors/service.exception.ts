import { HttpException, HttpStatus } from '@nestjs/common';

export class ServiceException extends HttpException {
  constructor(serviceName: string, error: string) {
    super(error, HttpStatus.BAD_REQUEST);
    this.name = `${serviceName}ServiceError`;
  }
}
