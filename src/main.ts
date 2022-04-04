import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { json, urlencoded } from 'express';
import { AppModule } from './app.module';

const isProd = process.env.NODE_ENV === 'production';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = Number(process.env.PORT || 3000);

  if (!isProd)
        app.enableCors();

    app.useGlobalPipes(new ValidationPipe({forbidUnknownValues: true}));

    app.use(json());
    app.use(urlencoded({extended: true}));

  const config = new DocumentBuilder()
    .setTitle('Transfer API')
    .setDescription('Transfer API')
    .setVersion('1.0')
    .addTag('transfer')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
  
  console.log(AppModule)
  console.log('******************************');
  console.log(`        SERVER STARTED        `);
  console.log(`    Listening on port ${port} `);
  console.log('******************************');
}
bootstrap();
