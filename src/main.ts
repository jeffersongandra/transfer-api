import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { LogLevel, ValidationPipe } from "@nestjs/common";
import { AppModule } from './app.module';
import { json, urlencoded } from 'express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
	const isProd = process.env.NODE_ENV === 'production';
	const logLevel: LogLevel[] = ['log', 'error', 'verbose', 'warn'];
	const logLevelDevelopment: LogLevel[] = isProd ? [] : ['debug'];

	const port = Number(process.env.PORT || 3000);
	const app = await NestFactory.create(AppModule, {logger: [...logLevel, ...logLevelDevelopment]});

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
