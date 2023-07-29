import { Body, Controller, Get, HttpException, HttpStatus, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { WhisperService } from './services/whisper.service';
import { ApiBadRequestResponse, ApiBody, ApiConsumes, ApiOkResponse, ApiProperty } from '@nestjs/swagger';
import { TranslationService } from './services/translation.service';

export class TranslationDto {
  @ApiProperty({ type: String })
  text: string;
}

export class FileUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: Express.Multer.File;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly whisperService: WhisperService, private readonly translationService: TranslationService) {
  }

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

  @Post('translate')
  @ApiBody({
    type: TranslationDto,
  })
  @ApiOkResponse()
  @ApiBadRequestResponse()
  async translate(@Body('text') text?: string): Promise<string> {
    if (!text) {
      throw new HttpException('Text was not defined', HttpStatus.BAD_REQUEST);
    }

    return await this.translationService.translate(text);
  }
}
