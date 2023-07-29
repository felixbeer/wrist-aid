import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TranslateTextOptions, Translator } from 'deepl-node';

@Injectable()
export class TranslationService {
  private readonly translator: Translator;

  constructor(private readonly configService: ConfigService) {
    this.translator = new Translator(configService.get<string>('DEEPL_API_KEY'));
  }

  async translate(inputText: string): Promise<string> {
    return (await this.translator.translateText(inputText, 'de', 'en-US')).text;
  }
}