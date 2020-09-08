import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse } from '@angular/common/http';

import { MessageService } from './message.service';

export interface RequestCacheEntry {
  url: string;
  response: HttpResponse<any>;
  lastRead: number;
}

export abstract class RequestCache {
  abstract get(request: HttpRequest<any>): HttpResponse<any> | undefined;
  abstract put(request: HttpRequest<any>, response: HttpResponse<any>): void;
}

const maxAge = 30000; // maximum cache age (ms)

@Injectable()
export class RequestCacheService extends RequestCache {

  // urlをキー、RequestCacheEntryのプロパティをバリューとして持つマップ
  cache = new Map<string, RequestCacheEntry>();

  constructor(private messageService: MessageService) {
    super();
  }

  get(request: HttpRequest<any>): HttpResponse<any> | undefined {
    const url = request.urlWithParams;
    const cached = this.cache.get(url);

    if (!cached) {
      return undefined;
    }

    const isExpired = cached.lastRead < (Date.now() - maxAge);
    this.messageService.add(`Found ${isExpired ? 'expired ' : ''}cached response for "${url}".`);

    return isExpired ? undefined : cached.response;
  }

  put(request: HttpRequest<any>, response: HttpResponse<any>): void {
    const url = request.urlWithParams;
    this.messageService.add(`Caching response from "${url}".`);

    const newEntry = {
      url,
      response,
      lastRead: Date.now(),
    };
    this.cache.set(url, newEntry);

    // remove expired cache entries
    const expired = Date.now() - maxAge;
    this.cache.forEach(entry => {
      if (entry.lastRead < expired) {
        this.cache.delete(entry.url);
      }
    });

    this.messageService.add(`Request cache size: ${this.cache.size}.`);
  }
}
