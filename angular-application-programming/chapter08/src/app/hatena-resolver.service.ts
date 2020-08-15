import { Injectable } from '@angular/core'
import { Resolve, ActivatedRouteSnapshot } from '@angular/router'
import { HatenaService } from './hatena.service'

@Injectable()
export class HatenaResolver implements Resolve<any> {
  // HatenaServiceをインスタンス化
  constructor(private hatenaService: HatenaService) {}

  // データを取得
  resolve(route: ActivatedRouteSnapshot) {
    return this.hatenaService.requestGet(route.params['url'])
  }
}
