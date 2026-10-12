import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Logger } from '@nestjs/common';
import type { Response } from 'express';
import { Prisma } from '../../generated/prisma/client.js';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(PrismaExceptionFilter.name);

  catch(error: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const res = host.switchToHttp().getResponse<Response>();

    const map: Record<string, { status: number; message: string }> = {
      P2002: { status: HttpStatus.CONFLICT, message: 'Already exists' },
      P2025: { status: HttpStatus.NOT_FOUND, message: 'Record not found' },
      P2003: { status: HttpStatus.BAD_REQUEST, message: 'Related record not found' },
    };

    const known = map[error.code];
    if (!known) {
      this.logger.error(`${error.code}: ${error.message}`);
    }
    const { status, message } = known ?? {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Database error',
    };

    res.status(status).json({ statusCode: status, message, code: error.code });
  }
}