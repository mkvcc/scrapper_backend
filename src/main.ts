import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  const config = new DocumentBuilder()
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  let port = process.env.PORT;
  app.enableCors({
    origin: 'http://localhost:5173',
    methods: 'GET, PUT, POST, DELETE, OPTIONS',
    credentials: true,
  });

  await app.listen(port);
  console.log('appication stated at port : ', port);
}

bootstrap();
