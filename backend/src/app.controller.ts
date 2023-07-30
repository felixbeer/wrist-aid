import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { OpenaiService } from './services/openai.service';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConsumes,
  ApiOkResponse, ApiProduces,
  ApiProperty,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { TranslationService } from './services/translation.service';
import { DatabaseService } from './services/database.service';
import { AudoAiService } from './services/audoai.service';
import { Report } from './entities/report.entity';
import { User } from './entities/user.entity';
import { UsersService } from './services/users.service';

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
  constructor(
    private readonly appService: AppService,
    private readonly openAiService: OpenaiService,
    private readonly translationService: TranslationService,
    private readonly audoAiService: AudoAiService,
    private readonly databaseService: DatabaseService,
    private readonly usersService: UsersService,
  ) {
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
  async test(@UploadedFile() file: Express.Multer.File) {
    return await this.openAiService.transcribe(file);
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

  @Post('remove-noise')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'audio file to transcribe',
    type: FileUploadDto,
  })
  removeNoise(@UploadedFile() file: Express.Multer.File) {
    this.audoAiService.denoiseAudio(file);
    return 'Your audio is being processed.';
  }

  @Post('newReportTest')
  @ApiBody({
    type: TranslationDto,
  })
  @ApiOkResponse()
  @ApiBadRequestResponse()
  async sendReportTest(@Body('text') text?: string) {
    if (!text) {
      throw new HttpException('Text was not defined', HttpStatus.BAD_REQUEST);
    }

    await this.databaseService.storeReport(text, '/tmp');
  }

  @Get('reports')
  @ApiOkResponse({
    type: Array<Report>,
  })
  async allReports(): Promise<Report[]> {
    return await this.databaseService.getAllReports();
  }

  @Get('users')
  @ApiOkResponse({
    type: Array<User>,
  })
  async allUsers(): Promise<User[]> {
    return await this.usersService.getAllUsers();
  }
}
