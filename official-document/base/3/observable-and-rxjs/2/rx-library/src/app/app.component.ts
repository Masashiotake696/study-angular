import { Component, OnInit } from '@angular/core';

import { from, interval, fromEvent, of, pipe } from 'rxjs';
import { ajax, AjaxResponse, AjaxError } from 'rxjs/ajax';
import { map, filter, catchError, retry } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    // ------------ Observable作成関数 ------------

    /**
     * promiseからobservableを作成する
     */
    const result = from(fetch('/assets/data.json'));
    result.subscribe({
      next(response: Response): void {
        response.text().then((text: string) => {
          const data = JSON.parse(text).data;
          console.log(`Data is: ${data}`);
        });
      },
      error(error: Error): void {
        console.error(`Error: ${error}`);
      },
      complete(): void {
        console.log('Completed');
      }
    });

    /**
     * カウンターからobservableを作成する
     */
    const secondsCounter = interval(1000);
    secondsCounter.subscribe((num: number) => {
      console.log(`It's benn ${num} seconds since subscribing!`);
    });

    /**
     * イベントからobservableを作成する
     */
    const element = document.getElementById('my-element');
    const mouseMoves = fromEvent(element, 'mousemove');
    const subscription = mouseMoves.subscribe((event: MouseEvent) => {
      console.log(`Coords: ${event.clientX} X ${event.clientY}`);
      if (event.clientX < 40 && event.clientY < 40) {
        console.log('Mouse event end');
        subscription.unsubscribe();
      }
    });

    /**
     * AJAXリクエストからobservableを作成する
     */
    const apiData = ajax('/assets/data.json');
    apiData.subscribe((response: AjaxResponse) => {
      console.log(response.status, response.response);
    });

    // ------------ オペレーター ------------

    /**
     * map function
     */
    const numbers = of(1, 2, 3);
    const squareValues = map((value: number) => value * value);
    const squaredNumbers = squareValues(numbers);
    squaredNumbers.subscribe(x => console.log(x)); // 1, 4, 9

    /**
     * pipe function
     */
    const numbers2 = of(1, 2, 3);
    const squareOddValues = pipe(
      filter((num: number) => num % 2 !== 0),
      map((num: number) => num * num)
    );
    const squareOdd = squareOddValues(numbers2);
    squareOdd.subscribe(x => console.log(x)); // 1, 9

    /**
     * pipe method
     */
    const squareEven = of(1, 2, 3, 4, 5)
      .pipe(
        filter((num: number) => num % 2 === 0),
        map((num: number) => num * num),
      );
    squareEven.subscribe(x => console.log(x)); // 4, 16

    // ------------ エラーハンドリング ------------

    /**
     * catchError
     */
    const notFoundData = ajax('/assets/notfound.json').pipe(
      retry(3), // catchErrorオペレータがエラーを補足した場合に3回までリトライする
      map((response: AjaxResponse) => {
        // ここまで処理はこない（catchErrorで先に捕捉される）
        if (!response.response) {
          throw new Error('Value expected!');
        }
        return response.response;
      }),
      catchError((error: AjaxError) => {
        console.log(`Ajax Error: ${error.message}`);
        return of([]);
      })
    );

    notFoundData.subscribe({
      next(data: string): void {
        console.log(`data: ${data}`);
      },
      error(): void {
        // ここまで処理はこない（catchErrorでデフォルト値を指定したため、ストリームがエラーを処理せず値を処理し続ける）
        console.log('errors already caught ...  will not run');
      }
    });
  }
}
