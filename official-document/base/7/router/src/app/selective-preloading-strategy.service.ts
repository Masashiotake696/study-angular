import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';

import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectivePreloadingStrategyService implements PreloadingStrategy {
  preloadModules: string[] = [];

  // 初回表示の裏側で分割したモジュールを読み込むようにする（dataでpreloadプロパティが渡されている場合）
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    if (route.data && route.data.preload) {
      // add the route path to the preloaded module array
      this.preloadModules.push(route.path);

      // log the route path to the console
      console.log(`Preloaded: ${route.path}`);

      return load();
    } else {
      return of(null);
    }
  }
}
