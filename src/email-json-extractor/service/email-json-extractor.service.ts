import { Injectable } from '@nestjs/common';
import { simpleParser } from 'mailparser';
import { readFileSync } from 'fs';
import axios from 'axios';

@Injectable()
export class EmailJsonExtractorService {
  async parseEmailFromFile(filePath: string): Promise<any> {
    const emailContent = readFileSync(filePath, 'utf-8');
    const parsed = await simpleParser(emailContent);

    for (const attachment of parsed.attachments) {
      if (attachment.contentType === 'application/json') {
        return JSON.parse(attachment.content.toString('utf8'));
      }
    }

    const jsonLink = this.extractJsonLink(parsed.text || '');
    if (jsonLink) {
      return jsonLink.endsWith('.json')
        ? await this.fetchJsonFromUrl(jsonLink)
        : await this.fetchJsonFromWebPage(jsonLink);
    }
    return null;
  }

  private extractJsonLink(text: string): string | null {
    const urlRegex = /(http[s]?:\/\/[^\s]+)/g;
    const matches = text.match(urlRegex);
    return matches ? matches[0] : null;
  }

  private async fetchJsonFromUrl(url: string): Promise<any> {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (exception) {
      console.error(exception);
      throw new Error(exception);
    }
  }

  private async fetchJsonFromWebPage(url: string): Promise<any> {
    try {
      const pageResponse = await axios.get(url);
      const pageContent = pageResponse.data;
      const jsonLink = this.extractJsonLink(pageContent);
      return jsonLink ? await this.fetchJsonFromUrl(jsonLink) : null;
    } catch (exception) {
      console.error(exception);
      throw new Error(exception);
    }
  }
}
