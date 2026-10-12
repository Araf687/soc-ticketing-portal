import { PrismaService } from '../prisma/prisma.service.js';
export declare class HealthController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    root(): {
        ok: boolean;
        message: string;
        time: string;
    };
    check(): Promise<{
        ok: boolean;
        database: string;
        time: string;
    }>;
}
