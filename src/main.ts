import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import * as os from 'os';
import * as express from 'express';
import { ValidationPipe } from '@nestjs/common';

config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('master-admin');
  app.use(express.json({ limit: '10mb' }));
  app.useGlobalPipes(new ValidationPipe());
  const port = process.env.PORT || 3000;
  await app.listen(port, () => {
    const localIP = getLocalIPAddress();
    console.log(`Application is running on: http://${localIP}:${port}`);
  });
}

function getLocalIPAddress() {
  const interfaces = os.networkInterfaces();
  for (const interfaceName in interfaces) {
    const addresses = interfaces[interfaceName];
    for (const address of addresses) {
      if (address.family === 'IPv4' && !address.internal) {
        return address.address;
      }
    }
  }
  return 'localhost';
}

bootstrap();
