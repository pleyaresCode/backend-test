import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { JsonTransformerModule } from './json-transformer/json-transformer.module';
import { EmailJsonExtractorModule } from './email-json-extractor/email-json-extractor.module';

@Module({
  imports: [JsonTransformerModule, EmailJsonExtractorModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
