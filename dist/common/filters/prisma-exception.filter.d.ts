import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { Prisma } from '../../generated/prisma/client.js';
export declare class PrismaExceptionFilter implements ExceptionFilter {
    private readonly logger;
    catch(error: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost): void;
}
