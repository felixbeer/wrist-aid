import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import * as FormData from 'form-data';
import * as fs from 'fs';
import { OpenaiService } from './openai.service';
import { ReportService } from './report.service';

import { Buffer } from 'node:buffer';

enum JobStatusState {
  DOWNLOADING = 'downloading',
  QUEUED = 'queued',
  IN_PROGRESS = 'in_progress',
  SUCCEEDED = 'succeeded',
  FAILED = 'failed',
}

type JobStatusResponseType = {
  state: JobStatusState;
  jobsAhead?: number;
  percent?: number;
  downloadPath?: string;
  reason?: string;
};

@Injectable()
export class AudoAiService {
  private readonly AUDOAI_API_KEY: string;

  constructor(
    private configService: ConfigService,
    private openApiService: OpenaiService,
    private readonly databaseService: ReportService,
  ) {
    this.AUDOAI_API_KEY = this.configService.get<string>('AUDOAI_API_KEY')!;
  }

  async denoiseAudio(
    file: Express.Multer.File,
    userid: number,
  ): Promise<string> {
    console.log('');
    console.log('starting noise removal process');
    const fileId = await this.uploadFile(file);
    console.log('fileId: ' + fileId);

    const jobId = await this.removeNoise(fileId);
    console.log('jobId: ' + jobId);

    let jobFinished = false;
    let throttle = false;

    let downloadPath: string = '';

    while (!jobFinished) {
      throttle = true;
      const jobStatus: JobStatusResponseType = await this.getJobStatus(jobId);

      if (JobStatusState.FAILED === jobStatus.state) {
        jobFinished = true;
      }
      if (JobStatusState.SUCCEEDED === jobStatus.state) {
        downloadPath = jobStatus.downloadPath!;
        jobFinished = true;
      }
      setTimeout(() => (throttle = false), 500);
    }

    console.log('finished noise removal process:', downloadPath);

    const denoisedFile = await this.downloadFile(downloadPath);
    const filePath = `./uploadedFiles/${new Date().getTime()}.m4a`;

    let writer = fs.createWriteStream(filePath);

    writer.write(denoisedFile);

    let text = await this.openApiService.transcribe(file);
    console.log('Speech to text: ' + text);
    await this.databaseService.storeReport(text, filePath, userid);

    return text;
  }

  private async uploadFile(file: Express.Multer.File): Promise<string> {
    const formData = new FormData();

    formData.append('file', file.buffer, {
      filename: file.originalname,
      contentType: file.mimetype,
    });

    const options: AxiosRequestConfig<FormData> = {
      headers: {
        'Content-Type': `multipart/form-data;`,
        'x-api-key': this.AUDOAI_API_KEY,
      },
    };

    return await axios
      .post('https://api.audo.ai/v1/upload', formData, options)
      .then(
        (response: AxiosResponse<{ fileId: string }>) => {
          return response.data.fileId;
        },
        (error) => {
          return error;
        },
      );
  }

  private async removeNoise(fileId: string): Promise<string> {
    const options: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json;',
        'x-api-key': this.AUDOAI_API_KEY,
      },
    };

    const data = {
      input: fileId,
      outputExtension: 'm4a',
      noiseReductionAmount: 90,
    };

    return await axios
      .post('https://api.audo.ai/v1/remove-noise', data, options)
      .then(
        (response: AxiosResponse<{ jobId: string }>) => {
          return response.data.jobId;
        },
        (error) => {
          return error;
        },
      );
  }

  private async getJobStatus(jobId: string): Promise<JobStatusResponseType> {
    const options: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json;',
        'x-api-key': this.AUDOAI_API_KEY,
      },
    };

    return await axios
      .get(`https://api.audo.ai/v1/remove-noise/${jobId}/status`, options)
      .then(
        (response: AxiosResponse<JobStatusResponseType>) => {
          return response.data;
        },
        (error) => {
          return error;
        },
      );
  }

  private async downloadFile(downloadPath: string): Promise<any> {
    const options: AxiosRequestConfig = {
      headers: {
        'x-api-key': this.AUDOAI_API_KEY,
      },
      responseType: 'arraybuffer',
    };

    return await axios
      .get(`https://api.audo.ai/v1${downloadPath}`, options)
      .then(
        (response: AxiosResponse<Buffer>) => {
          return Buffer.from(response.data);
        },
        (error) => {
          return error;
        },
      );
  }
}
