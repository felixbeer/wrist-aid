import { Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { WhisperService } from './services/whisper.service';
import { ApiBody, ApiConsumes, ApiProperty } from '@nestjs/swagger';


export class FileUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: Express.Multer.File;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly whisperService: WhisperService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('transcribe')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'audio file to transcribe',
    type: FileUploadDto,
  })
  test(@UploadedFile() file: Express.Multer.File) {
    return this.whisperService.transcribe(file);
  }
}
