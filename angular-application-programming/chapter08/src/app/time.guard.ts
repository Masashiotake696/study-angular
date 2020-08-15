import { Injectable } from '@angular/core'
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'

@Injectable()
export class TimeGuard implements CanActivate {
  // ガードの実処理
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const limit = new Date(2017, 4, 30)
    const current = new Date()

    if (limit.getTime() > current.getTime()) {
      return true
    } else {
      window.alert('記事の公開期限が過ぎています。')
      return false
    }
  }
}
