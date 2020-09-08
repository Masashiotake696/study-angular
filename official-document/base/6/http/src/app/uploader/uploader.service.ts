import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType, HttpErrorResponse } from '@angular/common/http';

import { MessageService } from '../message.service';
import { map, tap, last, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable()
export class UploaderService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ) { }

  upload(file: File): Observable<string> {
    if (!file) {
      return;
    }

    return this.http.post('/upload/file', file, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      map(event => this.getEventMessage(event, file)),
      tap(message => this.showProgress(message)),
      last(), // return last (completed) message to caller
      catchError(this.handleError(file))
    );
  }

  // Return distinct message for sent, upload progress and response events
  private getEventMessage(event: HttpEvent<any>, file: File): string {
    console.log(event);
    switch (event.type) {
      case HttpEventType.Sent:
        return `Uploading file "${file.name}" of size ${file.size}".`;
      case HttpEventType.UploadProgress:
        const percentDone = Math.round(100 * event.loaded / event.total);
        return `File "${file.name}" is ${percentDone}% uploaded.`;
      case HttpEventType.Response:
        return `File "${file.name}" was completely uploaded!`;
      default:
        return `File "${file.name}" surprising upload event: ${event.type}`;
    }
  }

  private showProgress(message: string): void {
    this.messageService.add(message);
  }

  private handleError(file: File): (error: HttpErrorResponse) => Observable<string> {
    const userMessage = `${file.name} upload failed.`;

    return (error: HttpErrorResponse) => {
      console.error(error);

      const message = (error.error instanceof Error) ?
        error.error.message :
        `server returned code ${error.status} with body "${error.error}"`;

      this.messageService.add(`${userMessage} ${message}`);

      // Let app keep running but indicate failure.
      return of(userMessage);
    };
  }
}
