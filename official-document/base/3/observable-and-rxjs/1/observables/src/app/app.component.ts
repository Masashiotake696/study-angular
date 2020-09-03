import { Component, OnInit } from '@angular/core';

import { Observable, Observer, of, TeardownLogic, PartialObserver } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    /**
     * ジオロケーションの更新を観察する
     */
    // Create an Observable that will start listening to geolocation updates when a customer subscribes.
    const locations = new Observable<Position>((observer) => {
      let watchId: number;

      // Simple geolocation API check provides values †o publish
      if ('geolocation' in navigator) {
        // 端末の位置が変化するたびに自動的に呼び出されるハンドラー関数を登録
        watchId = navigator.geolocation.watchPosition((position: Position) => {
          // 端末の位置が変化した時に通知するハンドラー
          observer.next(position);
        }, (error: PositionError) => {
          // エラー通知のハンドラー（Observableインスタンスの実行を停止する）
          observer.error(error);
        });
      } else {
        observer.error('Geolocation not available');
      }

      // When the consumer unsubscribes, clean up data ready for next subscription
      return {
        unsubscribe(): void {
          navigator.geolocation.clearWatch(watchId);
        }
      };
    });

    // Call subscribe() to start listening for updates.
    const locationsSubscription = locations.subscribe({
      // nextハンドラーの実処理
      next(position): void {
        const coords = position.coords;
        console.log(`Current Position: latitude=${coords.latitude}, longitude=${coords.longitude}`);
      },
      // errorハンドラーの実処理
      error(message): void {
        console.log(`Error Getting Location: ${message}`);
      }
    });

    // Stop listening for location after 10 seconds
    setTimeout(() => {
      locationsSubscription.unsubscribe();
      console.log('End');
    }, 10000);


    /**
     * オブザーバーを使用して購読
     */
    // Create simple observable that emits three values
    const myObservable = of(1, 2, 3);

    // Create observer object
    const myObserver = {
      next: element => console.log(`Observer got a next value: ${element}`), // 個々の値が提供された時のハンドラー
      error: error => console.error(`Observer got an error: ${error}`), // エラー通知のハンドラー
      complete: () => console.log(`Observer got a complete notification`), /// 実行完了通知のハンドラー（遅延した値は実行完了後もnextハンドラーに引き続き渡される）
    };

    // Execute with the observer object
    myObservable.subscribe(myObserver);


    /**
     * コンストラクターでオブザーバブルを作成する
     */
    // This function runs when subscribe() is called
    function sequenceSubscriber(observer: Observer<number>): TeardownLogic {
      // synchronously deliver 1, 2 and 3, then complete
      observer.next(1);
      observer.next(2);
      observer.next(3);
      observer.complete();

      // unsubscribe function doesn't need to do anything in this because values are delivered synchronously
      return {
        unsubscribe(): void { }
      };
    }

    // Create a new Observable that will deliver the above sequence
    const sequence = new Observable(sequenceSubscriber);

    // execute the Observable and print the result of each notification
    sequence.subscribe({
      next(num: number): void {
        console.log(num);
      },
      error(error: Error): void {
        console.log(error);
      },
      complete(): void {
        console.log('Finished sequence');
      }
    });


    /**
     * fromEvent関数でオブザーバーブルを作成する
     */
    // 引数で受け取るHTML要素とイベント名から購読時にイベント処理を定義できるオブザーバーを生成
    function fromEvent(target: HTMLElement, eventName: string): Observable<Event> {
      return new Observable((observer: Observer<Event>) => {
        const handler = (event: Event) => observer.next(event);

        // Add the event handler to target
        target.addEventListener(eventName, handler);

        return {
          unsubscribe(): void {
            // Detach the event handler from the target
            target.removeEventListener(eventName, handler);
          }
        };
      });
    }

    const ESC_KEY = 'Escape';
    const nameInput = document.getElementById('name') as HTMLInputElement;

    const subscription = fromEvent(nameInput, 'keydown').subscribe({
      next(event: KeyboardEvent): void {
        // Keyが'Escape'の場合に入力値を空にする
        if (event.key === ESC_KEY) {
          nameInput.value = '';
        }
      }
    });

    /**
     * マルチキャスト
     */
    function sequenceNumbersSubscriber(observer: Observer<number>): TeardownLogic {
      const seq = [1, 2, 3];
      let timeoutId: number;

      // 配列の中身のデータを次々にストリームに流す
      function doInSequence(array: number[], index: number): void {
        timeoutId = setTimeout(() => {
          observer.next(array[index]);
          if (index === array.length - 1) {
            observer.complete();
          } else {
            doInSequence(array, ++index);
          }
        }, 1000);
      }

      doInSequence(seq, 0);

      return {
        unsubscribe(): void {
          clearTimeout(timeoutId);
        }
      };
    }

    const sequenceNumbers = new Observable(sequenceNumbersSubscriber);

    sequenceNumbers.subscribe({
      next(num: number): void {
        console.log(`[sequenceNumbersSubscriber] 1st subscribe: ${num}`);
      },
      complete(): void {
        console.log('[sequenceNumbersSubscriber] Finished 1st sequenceNumbers');
      }
    });
    setTimeout(() => {
      sequenceNumbers.subscribe({
        next(num: number): void {
          console.log(`[sequenceNumbersSubscriber] 2nd subscribe: ${num}`);
        },
        complete(): void {
          console.log('[sequenceNumbersSubscriber] Finished 2nd sequenceNumbers');
        }
      });
    }, 500);

    function multicastSequenceSubscriber(): ((observer: Observer<number>) => TeardownLogic) {
      const multicastSeq = [1, 2, 3];
      const observers: Observer<number>[] = [];
      let multicastTimeoutId;

      return (observer) => {
        observers.push(observer);

        if (observers.length === 1) {
          multicastTimeoutId = doSequence({
            next(num: number): void {
              observers.forEach(obs => obs.next(num));
            },
            complete(): void {
              // unsubscribeされた時に元の配列に変更が加わるため、sliceメソッドでシャローコピーした配列を使用
              observers.slice(0).forEach(obs => obs.complete());
            }
          }, multicastSeq, 0);
        }

        return {
          unsubscribe(): void {
            // 購読が完了したらobservers配列から購読が完了したobserverを削除
            observers.splice(observers.indexOf(observer), 1);
            if (observers.length === 0) {
              // 全てのobserverの購読が完了したらタイマーをクリア
              clearTimeout(multicastTimeoutId);
            }
          }
        };
      };
    }

    function doSequence(observer: PartialObserver<number>, array: number[], index: number): number {
      return setTimeout(() => {
        // 配列の中身のデータを次々にストリームに流す
        observer.next(array[index]);
        if (index === array.length - 1) {
          observer.complete();
        } else {
          doSequence(observer, array, ++index);
        }
      }, 1000);
    }

    const multicastSequence = new Observable(multicastSequenceSubscriber());

    multicastSequence.subscribe({
      next(num: number): void {
        console.log(`[multicastSequenceSubscriber] 1st subscribe: ${num}`);
      },
      complete(): void {
        console.log('[multicastSequenceSubscriber] 1st sequence finished.');
      }
    });

    setTimeout(() => {
      multicastSequence.subscribe({
        next(num: number): void {
          console.log(`[multicastSequenceSubscriber] 2nd subscribe: ${num}`);
        },
        complete(): void {
          console.log('[multicastSequenceSubscriber] 2nd sequence finished.');
        }
      });
    }, 1500);
  }
}
