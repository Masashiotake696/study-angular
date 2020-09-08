import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { MessageService } from './message.service';
import { Observable, of } from 'rxjs';

// Type of the handleError function returned by HttpErrorHandlerService.createHandleError
export type HandleError = <T>(operation?: string, result?: T) => (error: HttpErrorResponse) => Observable<T>;

@Injectable()
export class HttpErrorHandlerService {

  constructor(private messageService: MessageService) { }

  // Create curried handleError function that alredy knows the service name
  createHandleError = (serviceName = '') => {
    return <T>(operation = 'operation', result = {} as T) => this.handleError(serviceName, operation, result);
  }

  /**
   * Returns a function that handles Http operation failures.
   * This error handler lets the app continue to run as if no error occurred.
   * @param serviceName Name of the data service that attempted the operation
   * @param operation Name of the operation that failed
   * @param result optional value to return as the observable result
   */
  handleError<T>(serviceName = '', operation = 'operation', result = {} as T): (error: HttpErrorResponse) => Observable<T> {
    return (error: HttpErrorResponse): Observable<T> => {
      console.error(error);

      const message = (error.error instanceof ErrorEvent) ? error.error.message : `server returned code ${error.status} with body ${error.error}`;
      this.messageService.add(`${serviceName}: ${operation} failed: ${message}`);

      return of(result);
    };
  }
}
