import { CommonHeadersModel } from './CommonHeadersModel';
import { HeaderModel } from './HeaderModel';

export class MailModel {
  timestamp: string;
  source: string;
  messageId: string;
  destination: string[];
  headersTruncated: boolean;
  headers: HeaderModel[];
  commonHeaders: CommonHeadersModel;
}
