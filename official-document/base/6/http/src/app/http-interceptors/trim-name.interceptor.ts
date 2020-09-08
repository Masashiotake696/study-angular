import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TrimNameInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const body = request.body;
    if (!body || !body.name) {
      return next.handle(request);
    }

    // Copy the body and trim whitespace from the name property
    const newBody = { ...body, name: body.name.trim() };
    // Clone request and set its body
    const newRequest = request.clone({
      body: newBody,
    });
    // Send the cloned request to the next handler
    return next.handle(newRequest);
  }

}
