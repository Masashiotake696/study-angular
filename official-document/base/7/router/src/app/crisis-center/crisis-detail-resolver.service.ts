import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable, of, EMPTY } from 'rxjs';

import { Crisis } from './crisis';
import { CrisisService } from './crisis.service';
import { take, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CrisisDetailResolverService implements Resolve<Crisis> {

  constructor(
    private crisisService: CrisisService,
    private router: Router
  ) { }

  // パラメータのidに一致するcrisisを取得して返却（ActivatedRouteのdataプロパティにセットされる）
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Crisis> | Observable<never> {
    const id = route.paramMap.get('id');

    return this.crisisService.getCrisis(id)
      .pipe(
        take(1), // 一つ目を取得
        mergeMap(crisis => { // 複数のストリームを一つにまとめる
          if (crisis) {
            return of(crisis);
          } else {
            // パラメータのIDに一致するcrisisが存在しない場合は/crisis-centerにリダイレクト
            this.router.navigate(['/crisis-center']);
            return EMPTY;
          }
        })
      );
  }
}
