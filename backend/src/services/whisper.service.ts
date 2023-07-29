import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Readable } from 'stream';
import * as FormData from 'form-data';

type Return = {
  text: string;
};

@Injectable()
export class WhisperService {
  constructor(private configService: ConfigService) {}

  async transcribe(file: Express.Multer.File): Promise<string> {
    const formData = new FormData();
    const audioStream = file.buffer;

    console.log(audioStream);

    formData.append('file', audioStream, {
      filename: file.filename,
      contentType: file.mimetype,
    });
    formData.append('model', 'whisper-1');
    formData.append('response_format', 'json');

    const config: AxiosRequestConfig<FormData> = {
      headers: {
        'Content-Type': `multipart/form-data; boundary=${formData.getBoundary()}`,
        Authorization: `Bearer ${this.configService.get<string>(
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
          console.log(value);
          return value.data.text;
        },
        (error) => {
          console.log(error);
          return error;
        },
      )
  }
}
