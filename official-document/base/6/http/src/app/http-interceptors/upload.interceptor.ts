import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpEventType,
  HttpResponse,
  HttpProgressEvent,
  HttpSentEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class UploadInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.indexOf('/upload/file') === -1) {
      return next.handle(request);
    }
    const delay = 300;
    return this.createUploadEvents(delay);
  }

  private createUploadEvents(delay: number): Observable<HttpEvent<any>> {
    const chunks = 5;
    const total = 12345678;
    const chunkSize = Math.ceil(total / chunks);

    return new Observable<HttpEvent<any>>(observer => {
      // notify the event stream that the request was sent.
      const sentEvent: HttpSentEvent = { type: HttpEventType.Sent };
      observer.next(sentEvent);

      uploadLoop(0);

      function uploadLoop(loaded: number): void {
        setTimeout(() => {
          loaded += chunkSize;

          if (loaded >= total) {
            const doneResponse = new HttpResponse({
              status: 201, // OK but no body
            });
            observer.next(doneResponse);
            observer.complete();
            return;
          }

          const progressEvent: HttpProgressEvent = {
            type: HttpEventType.UploadProgress,
            loaded,
            total
          };
          observer.next(progressEvent);
          uploadLoop(loaded);
        }, delay);
      }
    });
  }
}
