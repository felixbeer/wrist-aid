import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { OpenaiService } from './services/openai.service';
import { TranslationService } from './services/translation.service';
import { AudoAiService } from './services/audoai.service';
import { EventsModule } from './events/events.module';
import { DatabaseService } from './services/database.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from './entities/report.entity';
import { ReportsModule } from './entities/reports.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    EventsModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      // entities: [Report],
      database: 'reports',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [AppService, OpenaiService, TranslationService, AudoAiService, DatabaseService],
})
export class AppModule {
}
