import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const config = app.get(ConfigService);
    app.setGlobalPrefix('api');
    app.enableCors({
        origin: config.get('FRONTEND_URL'),
        credentials: true,
    });
    const port = Number(config.get('PORT'));
    await app.listen(port);
    Logger.log(`Backend running on http://localhost:${port}/api`, 'Bootstrap');
}
await bootstrap();
//# sourceMappingURL=main.js.map