import { Component, OnInit } from '@angular/core';

import { fromEvent, pipe, zip, range, timer, Observable, UnaryFunction } from 'rxjs';
import { map, filter, debounceTime, distinctUntilChanged, switchMap, retryWhen, mergeMap } from 'rxjs/operators';
import { ajax, AjaxResponse } from 'rxjs/ajax';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    /**
     * 事前サジェスト
     */
    const searchBox = document.getElementById('search-box');
    // idがsearch-boxの要素のinputイベントに対してオブザーバーを作成
    const typeahead = fromEvent(searchBox, 'input').pipe(
      map((event: KeyboardEvent) => (event.target as HTMLInputElement).value), // 入力イベントから入力値を抽出
      filter((text: string) => text.length > 2), // 文字数が2文字以上で抽出
      debounceTime(10), // 10ms以内に同一イベントが発生していない場合のみに抽出
      distinctUntilChanged(), // 前後の変更がある場合のみに抽出
      switchMap(() => ajax('/assets/searchbox.json')) // 前の非同期処理が解決する前に次の処理が流れてきた場合に前の処理をキャンセルする
    );
    typeahead.subscribe((data: AjaxResponse) => {
      data.response.forEach(record => {
        console.log(record.name);
      });
    });

    /**
     * 指数関数的バックオフ
     */
    function backoff(maxTries: number, ms: number): UnaryFunction<Observable<unknown>, Observable<unknown>> {
      return pipe(
        retryWhen(errors => {
          return zip(range(1, maxTries), errors)
            .pipe(
              map(([i]) => i * i), // 二乗
              mergeMap(i => timer(i * ms)) // 二乗した値 * ms
            );
        })
      );
    }

    ajax('/assets/notfound.json').pipe(backoff(3, 1000)).subscribe(data => {
      console.log(data);
    });
  }
}
