import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { UsersService } from '../services/users.service';
import { EntitiesModule } from '../entities/entities.module';

@Module({
  imports: [EntitiesModule],
  providers: [EventsGateway, UsersService],
  exports: [EventsGateway, UsersService],
})
export class EventsModule {
}