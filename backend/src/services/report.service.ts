import { Injectable } from '@nestjs/common';
import { EventsGateway } from '../events/events.gateway';
import { Repository } from 'typeorm';
import { Report } from '../entities/report.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class ReportService {
  constructor(private readonly webSocketGateway: EventsGateway,
              @InjectRepository(Report) private readonly reportRepository: Repository<Report>) {
  }

  async storeReport(reportText: string, fileLocation: string, userid: number) {
    const report = new Report();
    report.text = reportText;
    report.fileLocation = fileLocation;
    report.userId = userid;
    await this.reportRepository.save(report);
    await this.webSocketGateway.sendNewReport(report);
  }

  getAllReports(): Promise<Report[]> {
    return this.reportRepository.find();
  }
}