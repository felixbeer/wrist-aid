import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import * as FormData from 'form-data';

type Return = {
  text: string;
};

@Injectable()
export class OpenaiService {
  constructor(private configService: ConfigService) {
  }

  async transcribe(file: Express.Multer.File): Promise<string> {
    const formData = new FormData();

    formData.append('model', 'whisper-1');
    formData.append('file', file.buffer, {
      filename: file.originalname,
      contentType: file.mimetype,
    });
    formData.append('response_format', 'json');

    const config: AxiosRequestConfig<FormData> = {
      headers: {
        'Content-Type': `multipart/form-data;`,
        Authorization: `Bearer ${await this.configService.get<string>(
          'OPENAI_API_KEY',
        )}`,
      },
    };

    return await axios
      .post<Return, AxiosResponse<Return, FormData>, FormData>(
        'https://api.openai.com/v1/audio/transcriptions',
        formData,
        config,
      )
      .then(
        (value) => {
          return value.data.text;
        },
        (error) => {
          return error;
        },
      );
  }
}
