import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Catch(PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
    const message = exception.message.replace(/\n/g, '');
    switch (exception.code) {
      case 'P2003':
      case 'P2015':
      case 'P2025': {
        const statusCode = HttpStatus.NOT_FOUND;
        console.log(new HttpException({ statusCode, message }, statusCode));
        super.catch(
          new HttpException({ statusCode, message }, statusCode),
          host,
        );
        break;
      }
      default:
        // default 500 error code
        super.catch(exception, host);
        break;
    }
  }
}
