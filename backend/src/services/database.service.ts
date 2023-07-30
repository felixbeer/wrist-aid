import { Injectable } from '@nestjs/common';
import { EventsGateway } from '../events/events.gateway';
import { Repository } from 'typeorm';
import { Report } from '../entities/report.entity';

@Injectable()
export class DatabaseService {
  constructor(private readonly webSocketGateway: EventsGateway, private readonly reportRepository: Repository<Report>) {
  }

  async storeReport(reportText: string, fileLocation: string) {
    const report = new Report();
    report.text = reportText;
    report.fileLocation = fileLocation;
    await this.reportRepository.save(report);
    this.webSocketGateway.sendNewReport(reportText);
  }
}