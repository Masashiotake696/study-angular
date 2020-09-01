import { Component } from '@angular/core';

import { LoggerService } from '../logger.service';

@Component({
  selector: 'app-peek-a-boo-parent',
  providers: [
    LoggerService,
  ],
  template: `
    <div class="parent">
      <h2>Peek-A-Boo</h2>

      <button (click)="toggleChild()">
        {{ hasChild ? 'Destroy' : 'Create' }} PeekABooComponent
      </button>
      <button (click)="updateHero()" [hidden]="!hasChild">Update Hero</button>

      <app-peek-a-boo *ngIf="hasChild" [name]="heroName"></app-peek-a-boo>

      <h4>-- Lifecycle Hook Log --</h4>
      <div *ngFor="let message of hookLog">
        {{ message }}
      </div>
    </div>
  `,
  styles: [
    `.parent {
      background: moccasin;
    }`
  ]
})
export class PeekABooParentComponent {
  hasChild = false;
  hookLog: string[];

  heroName = 'Windstorm';
  private logger: LoggerService;

  constructor(logger: LoggerService) {
    this.logger = logger;
    this.hookLog = logger.logs;
  }

  toggleChild(): void {
    this.hasChild = !this.hasChild;
    if (this.hasChild) {
      // 初期化
      this.heroName = 'Windstorm';
      this.logger.clear();
    }
    this.hookLog = this.logger.logs;
    this.logger.tick();
  }

  updateHero(): void {
    this.heroName += '!';
    this.logger.tick();
  }
}
