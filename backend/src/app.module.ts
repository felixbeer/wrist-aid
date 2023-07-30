import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { OpenaiService } from './services/openai.service';
import { TranslationService } from './services/translation.service';
import { EventsModule } from './events/events.module';
import { DatabaseService } from './services/database.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    EventsModule,
  ],
  controllers: [AppController],
  providers: [AppService, OpenaiService, TranslationService, DatabaseService],
})
export class AppModule {
}
