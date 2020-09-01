import { Component, OnInit } from '@angular/core';

import { Observable, interval } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-hero-async-message',
  template: `
    <h2>Async Hero Message and AsyncPipe</h2>
    <p>Message: {{ message$ | async }}</p>
    <button (click)="resend()">Resend
  `
})
export class HeroAsyncMessageComponent implements OnInit {
  message$: Observable<string>;

  private messages = [
    'You are my hero!',
    'Your are the best hero!',
    'Will you be my hero?',
  ];

  constructor() {
    this.resend();
  }

  ngOnInit(): void {
  }

  resend(): void {
    this.message$ = interval(500).pipe(
      map(i => this.messages[i]),
      take(this.messages.length)
    );
  }
}
