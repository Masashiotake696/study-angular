import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';

import { MessageService } from '../message.service';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {

  constructor(private messageService: MessageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const started = Date.now();
    let ok: string;

    // Extend server response observable with logging

    return next.handle(request)
      .pipe(
        tap({
          // Succeeds when there is a response; ignore other events
          next: event => ok = event instanceof HttpResponse ? 'succeeded' : '',
          // Operation failed; error is an HttpErrorResponse
          error: error => ok = 'failed'
        }),
        // Log when response observable either completes or errors
        finalize(() => {
          const elapsed = Date.now() - started;
          const message = `${request.method} "${request.urlWithParams}" ${ok} in ${elapsed} ms.`;
          this.messageService.add(message);
        })
      );
  }
}
