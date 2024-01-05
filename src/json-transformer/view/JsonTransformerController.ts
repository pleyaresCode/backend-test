import { Body, Controller, Post } from '@nestjs/common';
import { mapperJson } from '../utils/mapper-json.util';
import { SESNotificationDTO } from '../DTO/sesRecordDTO';

@Controller('/jsonTransformer')
export class JsonTransformerController {
  @Post('')
  processJson(@Body() inputJson: SESNotificationDTO) {
    return mapperJson(inputJson);
  }
}
