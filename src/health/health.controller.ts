import { Controller, Get, ServiceUnavailableException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Controller()
export class HealthController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  root() { 
    return {ok:true, message: 'Service is up and running', time: new Date().toISOString()};
  }

  @Get('health')
  async check() {
    try {
      await this.prisma.$queryRaw`SELECT 1`;
    } catch {
      throw new ServiceUnavailableException({ ok: false, database: 'down' });
    }
    return { ok: true, database: 'up', time: new Date().toISOString() };
  }
}