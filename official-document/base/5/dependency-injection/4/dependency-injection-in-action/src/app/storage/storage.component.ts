import { Component, Self, SkipSelf } from '@angular/core';

import { BrowserStorageService, BROWSER_STORAGE } from '../storage.service';

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.css'],
  providers: [
    BrowserStorageService,
    { provide: BROWSER_STORAGE, useFactory: () => sessionStorage }
  ]
})
export class StorageComponent {

  constructor(
    @Self() private sessionStorageService: BrowserStorageService,
    @SkipSelf() private localStorageService: BrowserStorageService,
  ) { }

  setSession(): void {
    this.sessionStorageService.set('hero', 'Dr Nice - Session');
  }

  setLocal(): void {
    this.localStorageService.set('hero', 'Dr Nice - Local');
  }
}
