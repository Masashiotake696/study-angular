import { Component, OnInit, Inject, Injector } from '@angular/core'
import { Book } from './book'
import { BookService } from './book.service'
import { Hoge } from './hoge'
import { APP_INFO, KEYWORDS } from './app-info'
import { OverService } from './over.service'

@Component({
  selector: 'my-app',
  providers: [
    OverService,
  ],
  template: `
    <table class="table">
      <tr>
        <th>ISNBコード</th>
        <th>書名</th>
        <th>価格</th>
        <th>出版社</th>
      </tr>
      <tr *ngFor="let book of books">
        <td>{{ book.isbn }}</td>
        <td>{{ book.title }}</td>
        <td>{{ book.price }}円</td>
        <td>{{ book.publisher }}</td>
      </tr>
    </table>

    <hr />

    <!-- UseComponentコンポーネントを複数回呼び出 -->
    <ul>
      <my-use></my-use>
      <my-use></my-use>
      <my-use></my-use>
    </ul>

    <hr />

    <p>AppComponent：{{ overService.show() }}</p>
    <my-child></my-child>

    <hr />

    <my-noparent2></my-noparent2>
    <my-parent2></my-parent2>

    <hr />

    <my-parent3>
      <my-child3></my-child3>
    </my-parent3>
  `,
  styleUrls: [
    './app.component.css'
  ]
})
export class AppComponent implements OnInit {
  books: Book[]
  current: string

  constructor(
    // BookServiceサービスをインスタンス化
    private bookService: BookService,
    @Inject(Hoge) private bookServiceHoge: BookService,
    @Inject(APP_INFO) private appInfo: any,
    @Inject(KEYWORDS) private keywords: string[],
    private overService: OverService,
    // Injectorサービスを有効化
    private injector: Injector,
  ) {
    console.log(appInfo)
    console.log(keywords)
  }

  ngOnInit(): void {
    // コンポーネント初期化時に、サービス経由で書籍情報を取得
    console.log(this.bookServiceHoge.getBooks())
    this.books = this.bookService.getBooks()

    // インジェクター経由でサービスを取得
    let bookservice = this.injector.get(BookService)
    // this.books = bookservice.getBooks()
  }
}
