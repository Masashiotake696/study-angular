import { Component, OnInit } from '@angular/core';
import { Http, URLSearchParams, Headers, Jsonp } from '@angular/http'
import { HatenaService } from './hatena.service'
import { Observable } from 'rxjs/observable'

import 'rxjs/add/operator/map'

@Component({
  selector: 'my-app',
  providers: [
    HatenaService,
  ],
  template: `
    <form>
      <label for="name">名前：</label>
      <input id="name" name="name" type="text" [(ngModel)]="name" />
      <input type="button" (click)="onClickGet()" value="GET 送信" />
      <input type="button" (click)="onClickPost()" value="POST 送信" />
      <input type="button" (click)="onClickPostJson()" value="POST JSON 送信" />
    </form>
    <p>{{ result }}</p>

    <hr />

    <form>
      <label for="url">URL：</label>
      <input id="url" name="url" type="url" size="50" [(ngModel)]="url" />
      <input type="button" (click)="onSearch()" value="検索" />
    </form>
    <div>{{ count }}件</div>
    <ul>
      <li *ngFor="let comment of comments">
        {{ comment }}
      </li>
    </ul>

    <hr />

    <ul>
      <li *ngFor="let book of books">
        {{ book.title }}（{{ book.price }}円）
      </li>
    </ul>
    id=<input type="text" #id size="2" />
    <input type="button" (click)="getBook(id.value)" value="表示" />
    <input type="button" (click)="insertBook()" value="追加" />
    <input type="button" (click)="updateBook()" value="更新" />
    <input type="button" (click)="deleteBook()" value="削除" />

    <hr />

    <div *ngIf="message | async as message; else progress">
      サーバーからのメッセージ：{{ message }}
    </div>
    <ng-template #progress>Now Loading...</ng-template>
  `,
})
export class AppComponent implements OnInit {
  name = ''
  result = ''

  url = 'http://gihyo.jp/' // 検索先のURL
  count = 0 // ブックマーク件数
  comments: string[] = [] // ブックマークコメント

  books: any[] = []

  message: Observable<string>

  // Http/Jsonpサービスを注入
  constructor(
    private http: Http,
    private jsonp: Jsonp,
    private hatenaService: HatenaService,
  ) { }

  // [送信]ボタンクリックでHTTP GETによる非同期処理を開始
  onClickGet() {
    this.http.get('app/http.php', {
      params: { name: this.name }
    }).subscribe(
      // 通信成功時の処理（成功コールバック）
      response => {
        this.result = response.text()
      },
      // 通信失敗時の処理（失敗コールバック）
      error => {
        this.result = `通信失敗：${error.statusText}`
      }
    )
  }

  // [送信]ボタンクリックでHTTP POSTによる非同期処理を開始
  onClickPost() {
    let ps = new URLSearchParams()
    ps.set('name', this.name)

    this.http.post('app/http.php', ps, {
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    }).subscribe(
      // 通信成功時の処理（成功コールバック）
      response => {
        this.result = response.text()
      },
      // 通信失敗時の処理（失敗コールバック）
      error => {
        this.result = `通信失敗：${error.statusText}`
      }
    )
  }

  // [送信]ボタンクリックでHTTP POSTによる非同期処理を開始（JSON形式）
  onClickPostJson() {
    this.http.post('app/http.php', { name: this.name }, {
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).subscribe(
      // 通信成功時の処理（成功コールバック）
      response => {
        this.result = response.text()
      },
      // 通信失敗時の処理（失敗コールバック）
      error => {
        this.result = `通信失敗：${error.statusText}`
      }
    )
  }

  // [検索]ボタンクリックでWeb APIにリクエスト
  onSearch() {
    this.hatenaService.requestGet(this.url).subscribe(
      // データを正しく取得できた場合（成功コールバック）
      data => {
        let result: string[] = []
        data.bookmarks.forEach((value: any) => {
          if (value.comment !== "") {
            result.push(value.comment)
          }
        })
        this.comments = result
        this.count = data.count
      },
      // 通信途中でエラーがあった場合（失敗コールバック）
      error => {
        this.count = 0
        this.comments = []
        console.log('はてなサービスのアクセスに失敗しました。')
      }
    )
  }

  ngOnInit() {
    // コンポーネントの初期化時に書籍情報を取得
    this.getAllBooks()

    // コンポーネント初期化時にmessage.txtにアクセス
    this.message = this.http.get('api/books/1').delay(3000).map(response => response.json().data.title)
  }

  // 擬似データベースから書籍情報を取得
  getAllBooks() {
    this.http.get('/api/books').subscribe(
      response => {
        console.log(response.json())
        this.books = response.json().data
      }
    )
  }

  // [表示]ボタンで、テキストボックスで指定されたidの書籍情報をログ表示
  getBook(id: number) {
    this.http.get(`/api/books/${id}`).subscribe(
      response => {
        console.log(response.json().data)
      }
    )
  }

  // [追加]ボタンで、新規のデータを挿入
  insertBook() {
    const headers = new Headers({
      'Content-Type': 'application/json'
    })

    this.http.post(
      '/api/books',
      {
        isbn: '978-4-7741-8833-6',
        title: 'Ruby on Rails 5 アプリケーションプログラミング',
        price: 3500,
      },
      {
        headers: headers
      }
    ).subscribe(
      () => {
        this.getAllBooks() // リストをリロード
      }
    )
  }

  // [更新]ボタンで、id = 1 であるデータを更新
  updateBook() {
    const headers = new Headers({
      'Content-Type': 'application/json'
    })

    this.http.put(
      '/api/books/1',
      {
        id: 1,
        isbn: '978-7741-8411-X',
        title: 'Angular 2 アプリケーションプログラミング',
        price: 3700,
      },
      {
        headers: headers
      }
    ).subscribe(
      () => {
        this.getAllBooks() // リストをリロード
      }
    )
  }

  // [削除]ボタンで、id = 1 であるデータを削除
  deleteBook() {
    this.http.delete('/api/books/1').subscribe(
      () => {
        this.getAllBooks() // リストをリロード
      }
    )
  }
}
