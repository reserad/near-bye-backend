import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaClientExceptionFilter } from './filters/prisma-client-exception.filter';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { httpAdapter } = app.get(HttpAdapterHost);

  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));
  app.useLogger(app.get(Logger));
  app.setGlobalPrefix('api');

  await app.listen(3001, '0.0.0.0');
}
bootstrap();
