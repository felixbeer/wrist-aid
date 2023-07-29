import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { OpenaiService } from './services/openai.service';
import { TranslationService } from './services/translation.service';
import { AudoAiService } from './services/audoai.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  controllers: [AppController],
  providers: [AppService, OpenaiService, TranslationService, AudoAiService]
})
export class AppModule {}
