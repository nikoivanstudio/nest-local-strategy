import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class ResponseExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const status = exception.getStatus() || 500;

    response.status(status).json({
      timestamp: new Date().toISOString(),
      status: 'fail',
      data: exception.getResponse(),
      code: status,
    });
  }
}
