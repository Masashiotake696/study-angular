import { Injectable } from '@angular/core';

@Injectable()
export class LoggerService {
  logs: string[] = [];
  prevMessage = '';
  prevMessageCount = 1;

  log(message: string): void {
    if (message === this.prevMessage) {
      // Repeat message; update last log entry with count.
      this.prevMessageCount++;
      this.logs[this.logs.length - 1] = `${message}(${this.prevMessageCount}x)`;
    } else {
      // New message; log it.
      this.prevMessage = message;
      this.prevMessageCount = 1;
      this.logs.push(message);
    }
  }

  clear(): void {
    this.logs = [];
  }

  // schedules a view refresh to ensure display catches up

  tick(): void {
    this.tick_then(() => {});
  }

  tick_then(callback: () => any): void {
    setTimeout(callback, 0);
  }
}
