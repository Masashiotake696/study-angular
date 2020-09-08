import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

import { Observable } from 'rxjs';

import { AuthService } from '../auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Get the auth token from the service
    const authorizationToken = this.authService.getAuthorizationToken();

    // The verbose way:
    // Clone the request and replace the original headers with cloned headers, updated with the authorization
    // const authRequest = request.clone({
    //   headers: request.headers.set('Authorization', authorizationToken), // headersに元のリクエストにAuthorizationキーを設定したものを指定
    // });

    // The Shortcut way:
    // Clone the request and set the new header in one step
    const authRequest = request.clone({
      setHeaders: {
        Authorization: authorizationToken,
      }
    });

    // Send cloned request with header to the next handler
    return next.handle(authRequest);
  }
}
