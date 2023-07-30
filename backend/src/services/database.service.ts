import { Injectable } from '@nestjs/common';
import { EventsGateway } from '../events/events.gateway';

@Injectable()
export class DatabaseService {
  constructor(private readonly webSocketGateway: EventsGateway) {
  }

  storeReport(reportText: string) {
    this.webSocketGateway.sendNewReport(reportText);
  }
}