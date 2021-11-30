import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export function GlobalResponseSwagger() {
  return applyDecorators(
    ApiResponse({ status: 200, description: 'OK' }),
    ApiResponse({ status: 201, description: 'CREATED' }),
    ApiResponse({ status: 204, description: 'NO CONTENT' }),
    ApiResponse({ status: 400, description: 'BAD REQUEST' }),
    ApiResponse({ status: 404, description: 'NOT FOUND' }),
    ApiResponse({ status: 409, description: 'CONFLICT' }),
    ApiResponse({ status: 500, description: 'SERVER ERROR' }),
  );
}
