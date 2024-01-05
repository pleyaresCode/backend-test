import { plainToInstance } from 'class-transformer';
import { SESNotificationModel } from '../model/SESNotificationModel';

export function mapperJson(json: SESNotificationModel) {
  if (json && json.Records) {
    const sesNotification = plainToInstance(SESNotificationModel, json);
    return convertToEmailSecurityStatus(sesNotification);
  } else {
    return { message: 'JSON NOT VALID' };
  }
}

function convertToEmailSecurityStatus(notification: SESNotificationModel) {
  const record = notification.Records[0];
  return {
    spam: `spamVerdict a boolean, PASS = true: ${
      record.ses.receipt.spamVerdict.status === 'PASS'
    }`,
    virus: `virusVerdict a boolean, PASS = true: ${
      record.ses.receipt.virusVerdict.status === 'PASS'
    }`,
    dns: `spfVerdict, dkimVerdict, dmarcVerdict a boolean, si todos PASS = true: ${
      record.ses.receipt.spfVerdict.status === 'PASS' &&
      record.ses.receipt.dkimVerdict.status === 'PASS' &&
      record.ses.receipt.dmarcVerdict.status === 'PASS'
    }`,
    mes: `${getMonthFromTimestamp(record.ses.mail.timestamp)}`,
    retrasado: `processingTimeMillis > 1000 = true: ${
      record.ses.receipt.processingTimeMillis > 1000
    }`,
    emisor: `${extractEmailIfNotDomino(record.ses.mail.source)}`,
    receptor: `${record.ses.mail.destination.map((email) =>
      extractEmailIfNotDomino(email),
    )}`,
  };
}

function getMonthFromTimestamp(timestamp: string): string {
  const date = new Date(timestamp);
  return date.toLocaleString('es', { month: 'long' });
}

function extractEmailIfNotDomino(email: string): string {
  if (email.endsWith('@dominio.com')) {
    return '';
  }
  return email;
}
