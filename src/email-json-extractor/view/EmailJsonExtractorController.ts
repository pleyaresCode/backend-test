import { Controller, Get, Query } from '@nestjs/common';
import { EmailJsonExtractorService } from '../service/email-json-extractor.service';
import { encodeFilePath } from '../utils/encode_path.util';

@Controller('/emailJson')
export class EmailJsonExtractorController {
  constructor(
    private readonly emailJsonExtractorService: EmailJsonExtractorService,
  ) {}

  @Get()
  receiveMail(@Query('path') path: string): Promise<any> {
    return this.emailJsonExtractorService.parseEmailFromFile(
      decodeURIComponent(encodeFilePath(path)),
    );
  }
}
