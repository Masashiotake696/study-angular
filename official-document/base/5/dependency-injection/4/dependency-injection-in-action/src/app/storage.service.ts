import { Injectable, InjectionToken, Inject } from '@angular/core';

export const BROWSER_STORAGE = new InjectionToken<Storage>(
  'Brower Storage',
  { providedIn: 'root', factory: () => localStorage } // factory関数でブラウザのwindowオブジェクトのlocalStorageプロパティを返す
);

@Injectable({
  providedIn: 'root'
})
export class BrowserStorageService {

  constructor(@Inject(BROWSER_STORAGE) public storage: Storage) { }

  get(key: string): void {
    this.storage.getItem(key);
  }

  set(key: string, value: string): void {
    this.storage.setItem(key, value);
  }

  remove(key: string): void {
    this.storage.removeItem(key);
  }

  clear(): void {
    this.storage.clear();
  }
}
