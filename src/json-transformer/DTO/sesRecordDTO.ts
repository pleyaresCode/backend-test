import { Type } from 'class-transformer';
import { SESNotificationModel } from '../model/SESNotificationModel';
import { RecordsModel } from '../model/RecordModel';

export class SESNotificationDTO {
  @Type(() => SESNotificationModel)
  Records: RecordsModel[];
}
