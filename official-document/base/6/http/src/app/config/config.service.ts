import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { Config } from './config';

@Injectable()
export class ConfigService {
  configUrl = 'assets/config.json';

  constructor(private http: HttpClient) { }

  getConfig(): Observable<Config> {
    return this.http.get<Config>(this.configUrl)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError), // then handle the error
      );
  }

  getConfigResponse(): Observable<HttpResponse<Config>> {
    return this.http.get<Config>(this.configUrl, { observe: 'response' });
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      console.error(`An error occured: ${error.error.message}`);
    } else {
      console.error(`Backend returned code ${error.status}, body was: ${error.message}`);
    }

    return throwError('Something bad happened; please try again later.');
  }

  makeIntentionalError(): Observable<object> {
    return this.http.get('not/a/real/url')
      .pipe(
        catchError(this.handleError)
      );
  }
}
