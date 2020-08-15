import { Injectable } from '@angular/core'
import { Jsonp,  URLSearchParams } from '@angular/http'
import { Observable } from 'rxjs/Observable'

import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

@Injectable()
export class HatenaService {
  // Jsonpサービスをインスタンス化
  constructor(private jsonp: Jsonp) {}

  // 指定されたURLをキーにブックマーク情報を取得
  requestGet(url: string): Observable<any> {
    let params = new URLSearchParams()
    params.set('url', url)
    params.set('callback', 'JSONP_CALLBACK')

    return this.jsonp.get(
      'http://b.hatena.ne.jp/entry/jsonlite/',
      {
        search: params
      }
    )
      // レスポンスをJSONデータに変換
      .map(
        response => {
          return response.json() || {}
        }
      )
      // エラー時にはエラーメッセージをスロー
      .catch(
        error => {
          return Observable.throw(error.statusText)
        }
      )
  }
}
