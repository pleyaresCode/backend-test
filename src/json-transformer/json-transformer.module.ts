import { Module } from '@nestjs/common';
import { JsonTransformerController } from './view/JsonTransformerController';

@Module({
  controllers: [JsonTransformerController],
})
export class JsonTransformerModule {}
