import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  logs: string[] = [];

  logInfo(message: string): void {
    this.log(`INFO: ${message}`);
  }

  logDebug(message: string): void {
    this.log(`DEBUG: ${message}`);
  }

  logError(message: string): void {
    this.log(`ERROR: ${message}`);
  }

  private log(message: string, isError = false): void {
    this.logs.push(message);
    isError ? console.error(message) : console.log(message);
  }
}
