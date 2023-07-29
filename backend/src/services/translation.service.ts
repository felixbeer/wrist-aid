import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SourceLanguageCode, TargetLanguageCode, TranslateTextOptions, Translator } from 'deepl-node';

@Injectable()
export class TranslationService {
  private readonly translator: Translator;

  constructor(private readonly configService: ConfigService) {
    this.translator = new Translator(configService.get<string>('DEEPL_API_KEY')!);
  }

  async translate(inputText: string, sourceLang: SourceLanguageCode = 'de', targetLang: TargetLanguageCode = 'en-US'): Promise<string> {
    return (await this.translator.translateText(inputText, sourceLang, targetLang)).text;
  }
}