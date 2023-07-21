import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

async function bootstrap() {
  const fAdapt = new FastifyAdapter();
  fAdapt.register(require('fastify-multipart'));
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    fAdapt,
  );
  await app.listen(3000);
}
bootstrap();
