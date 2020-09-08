import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { HttpErrorHandlerService, HandleError } from '../http-error-handler.service';

export interface NpmPackageInfo {
  name: string;
  version: string;
  description: string;
}

export const searchUrl = 'https://npmsearch.com/query';

@Injectable()
export class PackageSearchService {
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandlerService: HttpErrorHandlerService,
  ) {
    this.handleError = httpErrorHandlerService.createHandleError('PackageSearch');
  }

  search(packageName: string, refresh = false): Observable<NpmPackageInfo[]> {
    // clear if no packageName
    if (!packageName.trim()) {
      return of([]);
    }

    const options = this.createHttpOptions(packageName, refresh);

    return this.http.get(searchUrl, options)
      .pipe(
        map((data: any) => {
          console.log(data);
          return data.results.map((entry: any) => ({
            name: (entry.name as string[]).join(', '),
            version: (entry.version as string[]).join(', '),
            description: (entry.description as string[]).join(', ')
          } as NpmPackageInfo)
          );
        }),
        catchError(this.handleError('search', []))
      );
  }

  private createHttpOptions(packageName: string, refresh = false): { headers: HttpHeaders, params: HttpParams } {
    // npm package name search api
    // e.g., http://npmsearch.com/query?q=dom'
    const params = new HttpParams({
      fromObject: {
        q: packageName,
      },
    });
    const headerMap = refresh ? { 'x-refresh': 'true' } : {};
    const headers = new HttpHeaders(headerMap);
    return {
      headers,
      params
    };
  }
}
