import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { MessageService } from '../message.service';

import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class DownloaderService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ) { }

  getTextFile(filename: string): Observable<string> {
    return this.http.get(filename, { responseType: 'text' })
      .pipe(
        tap({
          next: (data: string) => this.log(filename, data),
          error: error => this.logError(filename, error),
        })
      );
  }

  private log(filename: string, data: string): void {
    const message = `DownloaderService downloaded "${filename}" and got "${data}"`;
    this.messageService.add(message);
  }

  private logError(filename: string, error: any): void {
    const message = `DownloaderService failed to download "${filename}"; got error "${error.message}".`;
    console.error(message);
    this.messageService.add(message);
  }
}
