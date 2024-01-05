import { Module } from '@nestjs/common';
import { EmailJsonExtractorController } from './view/EmailJsonExtractorController';
import { EmailJsonExtractorService } from './service/email-json-extractor.service';

@Module({
  controllers: [EmailJsonExtractorController],
  providers: [EmailJsonExtractorService],
})
export class EmailJsonExtractorModule {}
