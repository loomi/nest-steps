import { HttpException, HttpStatus } from '@nestjs/common';

export class RepositoryException extends HttpException {
  constructor(repositoryName: string, error: string) {
    super(error, HttpStatus.BAD_REQUEST);
    this.name = `${repositoryName}RepositoryError`;
  }
}
