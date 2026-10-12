var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var PrismaExceptionFilter_1;
import { Catch, HttpStatus, Logger } from '@nestjs/common';
import { Prisma } from '../../generated/prisma/client.js';
let PrismaExceptionFilter = PrismaExceptionFilter_1 = class PrismaExceptionFilter {
    logger = new Logger(PrismaExceptionFilter_1.name);
    catch(error, host) {
        const res = host.switchToHttp().getResponse();
        const map = {
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
};
PrismaExceptionFilter = PrismaExceptionFilter_1 = __decorate([
    Catch(Prisma.PrismaClientKnownRequestError)
], PrismaExceptionFilter);
export { PrismaExceptionFilter };
//# sourceMappingURL=prisma-exception.filter.js.map