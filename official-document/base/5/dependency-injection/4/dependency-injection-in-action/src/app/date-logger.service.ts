import { Injectable } from '@angular/core';

import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class DateLoggerService extends LoggerService {
  logInfo(message: string): void {
    super.logInfo(this.stamp(message));
  }

  logDebug(message: string): void {
    super.logDebug(this.stamp(message));
  }

  logError(message: string): void {
    super.logError(this.stamp(message));
  }

  private stamp(message: string): string {
    return `${message} at ${new Date()}`;
  }
}
