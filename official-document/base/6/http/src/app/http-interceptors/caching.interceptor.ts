import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpResponse
} from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { tap, startWith } from 'rxjs/operators';

import { RequestCacheService } from '../request-cache.service';
import { searchUrl } from '../package-search/package-search.service';

@Injectable()
export class CachingInterceptor implements HttpInterceptor {

  constructor(private requestCacheService: RequestCacheService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!this.isCacheable(request)) {
      return next.handle(request);
    }

    const cachedResponse = this.requestCacheService.get(request);

    // cache-then-refresh
    if (request.headers.get('x-refresh')) {
      const result$ = this.sendRequest(request, next);
      return cachedResponse ?
        result$.pipe(startWith(cachedResponse)) :
        result$;
    }

    // cache-or-fetch
    return cachedResponse ? of(cachedResponse) : this.sendRequest(request, next);
  }

  private isCacheable(request: HttpRequest<any>): boolean {
    // Only GET requests are cacheable.
    // Only npm package search is cacheable in this app.
    return request.method === 'GET' && -1 < request.url.indexOf(searchUrl);
  }

  private sendRequest(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // No headers allowed in npm search request
    const noHeaderRequest = request.clone({
      headers: new HttpHeaders(),
    });

    return next.handle(noHeaderRequest)
      .pipe(
        tap(event => {
          if (event instanceof HttpResponse) {
            this.requestCacheService.put(request, event);
          }
        })
      );
  }
}
