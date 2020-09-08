import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class EnsureHttpsInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Clone request and replace 'http://' with 'https://' at the same time
    const secureRequest = request.clone({
      url: request.url.replace('http://', 'https://') // 変更したいプロパティのみ設定すれば良い
    });
    // Send the cloned, "secure" request to the next handler.
    return next.handle(secureRequest);
  }

}
