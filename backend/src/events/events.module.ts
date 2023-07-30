import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { UsersService } from '../services/users.service';
import { EntitiesModule } from '../entities/entities.module';
import { MissionService } from '../services/mission.service';

@Module({
  imports: [EntitiesModule],
  providers: [EventsGateway, UsersService, MissionService],
  exports: [EventsGateway, UsersService, MissionService],
})
export class EventsModule {
}