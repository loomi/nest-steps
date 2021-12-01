import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    const exceptionReponse = exception.getResponse();
    if (typeof exceptionReponse === 'string') {
      response.status(status).json({
        statusCode: status,
        name: exception.name,
        message: exception.message,
        stack: exception.stack,
      });
    } else {
      response.status(status).json({
        statusCode: status,
        name: exception.name,
        message: exceptionReponse['message'][0],
        stack: exception.stack,
      });
    }
  }
}
