import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { OpenaiService } from './services/openai.service';
import { TranslationService } from './services/translation.service';
import { AudoAiService } from './services/audoai.service';
import { EventsModule } from './events/events.module';
import { ReportService } from './services/report.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntitiesModule } from './entities/entities.module';
import { MissionService } from './services/mission.service';
import { UsersController } from './users.controller';
import { ReportsController } from './reports.controller';
import { MissionsController } from './missions.controller';

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
    EntitiesModule,
  ],
  controllers: [AppController, UsersController, ReportsController, MissionsController],
  providers: [AppService, OpenaiService, TranslationService, AudoAiService, ReportService],
})
export class AppModule {
}
