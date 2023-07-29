import {NestFactory} from '@nestjs/core';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';
import {AppModule} from './app.module';

const port = 3000;

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('/api')

    const config = new DocumentBuilder()
        .setTitle('wrist-aid')
        .setDescription('The wrist-aid API description')
        .setVersion('1.0')
        .addTag('wrist-aid')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/swagger', app, document);

    await app.listen(port);
}

bootstrap().then(() => console.log(`NestJs is running on localhost:${port}!`));