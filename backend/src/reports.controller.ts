import { Body, Controller, Get, HttpException, HttpStatus, ParseIntPipe, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { Report } from './entities/report.entity';
import { SendReportTestDto } from './app.controller';
import { ReportService } from './services/report.service';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportService: ReportService) {
  }

  @Post('newReportTest')
  @ApiBody({
    type: SendReportTestDto,
  })
  @ApiOkResponse()
  @ApiBadRequestResponse()
  async sendReportTest(@Body('userid', ParseIntPipe) userid: number, @Body('text') text?: string) {
    if (!text) {
      throw new HttpException('Text was not defined', HttpStatus.BAD_REQUEST);
    }

    await this.reportService.storeReport(text, '/tmp', userid);
  }

  @Get()
  @ApiOkResponse({
    type: Array<Report>,
  })
  async allReports(): Promise<Report[]> {
    return await this.reportService.getAllReports();
  }
}