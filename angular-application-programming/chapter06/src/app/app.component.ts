import { Component, OnChanges, OnInit, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy, QueryList, ViewChildren, ViewEncapsulation } from '@angular/core';
import { Book } from './book'
import { Child2Component } from './child-2.component'
import { trigger, state, style, transition, animate, keyframes, group } from '@angular/animations';
import { Title, Meta } from '@angular/platform-browser'

@Component({
  selector: 'my-app',
  animations: [
    // アニメーショントリガーbtnStateを定義
    trigger('btnState', [
      // 状態off、onを定義
      state('off', style({
        border: 'none',
        backgroundColor: '#000',
        color: '#fff',
        fontWeight: 'normal',
        transform: 'scale(0.8) rotate(0deg)'
      })),
      state('on', style({
        border: '1px solid #fff',
        backgroundColor: '#f00',
        color: '#fff',
        fontWeight: 'bold',
        transform: 'scale(1) rotate(5deg)'
      })),
      // 遷移情報を定義
      // transition('off => on', animate('200ms linear')),
      // transition('on => off', animate('200ms linear'))
      transition('off <=> on', animate('200ms linear'))
    ]),
    // labelStateトリガーを宣言
    trigger('labelState', [
      // 表示時の遷移を宣言
      transition('void => *', [ // transition(':enter', [...]) でも可
        style({
          transform: 'translateX(100%)'
        }),
        animate('300ms')
      ]),
      // 非表示時の遷移を宣言
      transition('* => void', [ // transition(':leave', [...]) でも可
        animate('300ms', style({
          transform: 'translateX(100%)'
        }))
      ])
    ]),
    trigger('labelState2', [
      transition(':enter', [
        animate('1000ms', keyframes([
          style({
            transform: 'translateX(100%)',
            offset: 0,
          }),
          style({
            transform: 'translateX(50px)',
            offset: 0.1
          }),
          style({
            transform: 'translateX(0)',
            offset: 1
          })
        ]))
      ]),
      transition(':leave', [
        animate('1000ms', keyframes([
          style({
            transform: 'translateX(0)',
            offset: 0
          }),
          style({
            transform: 'translateX(50px)',
            offset: 0.9
          }),
          style({
            transform: 'translateX(100%)',
            offset: 1
          })
        ]))
      ])
    ]),
    trigger('labelState3', [
      transition(':leave', [
        group([
          animate('800ms', style({
            opacity: 0
          })),
          animate('300ms 500ms', style({
            transform: 'translateX(100%)'
          }))
        ])
      ])
    ])
  ],
  template: `
    <style>
      h2 {
        font-size: 150%;
        text-decoration: underline;
        color: #369;
      }

      p {
        background-color: Yellow;
        color: Red;
      }
    </style>
    <link rel="stylesheet" href="app/app.component.css" />
    <div>
      <span *ngFor="let book of books">
        <a href="#" (click)="onclick(book)">{{ book.title }}</a>
      </span>
    </div>
    <hr />
    <!-- <detail-book [book]="selected_book"></detail-book> -->
    <p>編集中の書籍：{{ edit.book?.title }}</p>
    <edit-book #edit [book]="selected_book" (edited)="onEdited($event)"></edit-book>

    <hr />

    <div>
      <label>
        表示/非表示
        <input type="checkbox" (change)="onChange()" checked />
      </label>
    </div>
    <!-- showプロパティがtruenお場合には、子コンポーネントを表示 -->
    <my-child [time]="current" *ngIf="show"></my-child>

    <hr />

    <my-child2 [index]="1"></my-child2>
    <my-child2 [index]="2"></my-child2>
    <my-child2 [index]="3"></my-child2>
    <p>完成：{{ poems[0] }} {{ poems[1] }} {{ poems[2] }}</p>

    <hr />

    <my-content>
      <span class="header">あなたもWINGSプロジェクトに参加しませんか？</span>
      <span class="attention">ただいま、メンバー募集中！</span>
      <small>連絡先：webmaster@wings.msn.to</small>
      <p>興味のある方は、WINGSプロジェクト採用担当まで、メールでご連絡ください。</p>
      <small>（担当：山田）</small>
    </my-content>

    <hr />

    <my-parent>
      <my-child3></my-child3>
    </my-parent>

    <hr />

    <h2>Angularアプリケーションプログラミング</h2>
    <p>こんにちは、山田さん</p>

    <hr />

    <my-child4></my-child4>

    <hr />

    <input type="button" [value]="caption" [@btnState]="flag" (click)="toggle()" />

    <hr />

    <div>
      <!-- クリック時にshow2プロパティを反転 -->
      <label for="show2">表示/非表示：</label>
      <input id="show2" name="show2" type="checkbox" [(ngModel)]="show2" />
      <!-- show2プロパティの真偽に応じて表示/非表示を切り替え -->
      <h2 *ngIf="show2" [@labelState]>こんにちは、Angular！</h2>
    </div>

    <div>
      <!-- クリック時にshow3プロパティを反転 -->
      <label for="show3">表示/非表示：</label>
      <input id="show3" name="show3" type="checkbox" [(ngModel)]="show3" />
      <!-- show3プロパティの真偽に応じて表示/非表示を切り替え -->
      <h2 *ngIf="show3" [@labelState2]>こんにちは、Angular！</h2>
    </div>

    <div>
      <!-- クリック時にshow4プロパティを反転 -->
      <label for="show4">表示/非表示：</label>
      <input id="show4" name="show4" type="checkbox" [(ngModel)]="show4" />
      <!-- show4プロパティの真偽に応じて表示/非表示を切り替え -->
      <h2 *ngIf="show4" [@labelState3] (@labelState3.start)="onanim($event)" (@labelState3.done)="onanim($event)">こんにちは、Angular！</h2>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      border: 1px double Red;
      background-color: #ffc0cb;
    }
    :host(.disable) {
      display: block;
      border: 1px solid #aaa;
      color: #fff;
      background-color: #ccc;
    }
    :host-context(.summer-theme) p {
      background-color: #0ff;
      color: #f00;
      font-weight: bold;
    }
    h2 {
      font-size: 150%;
      text-decoration: underline;
      color: #369;
    }
    p {
      background-color: Yellow;
      color: Red;
    }
    :host /deep/ p {
      background-color: Yellow;
      color: Red;
    }
  `],
  styleUrls: [
    './app.component.css'
  ],
  encapsulation: ViewEncapsulation.Emulated,
  providers: [
    Title,
  ],
  host: {
    '(click)': 'onHostClick($event)',
    'role': 'banner',
    '[class.disabled]': 'true'
  }
})
export class AppComponent implements OnChanges, OnInit, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {
  selected_book: Book = null
  books: Book[] = [
    {
      isbn: '978-7741-8411-1',
      title: '改訂新版JavaScript本格入門',
      price: 2980,
      publisher: '技術評論社',
    },
    {
      isbn: '978-7980-4853-6',
      title: 'はじめてのAndroidアプリ開発 第2版',
      price: 3200,
      publisher: '秀和システム',
    }
  ]

  show = true
  current = new Date()

  // Child2Componentを取得
  @ViewChildren(Child2Component) children: QueryList<Child2Component>
  // Child2Componentの入力値を格納する配列
  poems = ['', '', '']

  flag = 'off' // 状態を管理する
  caption = 'オフ' // ボタンキャプション

  show2 = true
  show3 = true
  show4 = true

  onclick(book: Book) {
    this.selected_book = book
  }

  onEdited(after_book: Book) {
    for (let before_book of this.books) {
      if (before_book.isbn === after_book.isbn) {
        before_book.title = after_book.title
        before_book.price = after_book.price
        before_book.publisher = after_book.publisher
      }
    }

    this.selected_book = null
  }

  // チェックボックス変更時に実行
  onChange() {
    this.show = !this.show
    this.current = new Date()
  }

  // Titleサービス, Metaサービスを有効化
  constructor(private title: Title, private meta: Meta) {
    console.log('constructor')
  }

  // ライフサイクルメソッド（それぞれのタイミングでログを表示）
  ngOnInit() {
    console.log('ngOnInit')

    // タイトルを設定
    this.title.setTitle('Titleサービス')

    // メタ情報を追加
    this.meta.addTag({
      name: 'author',
      content: 'YAMADA, Yoshihiro'
    })
  }

  ngOnChanges() {
    console.log('ngOnChanges')
  }

  ngDoCheck() {
    console.log('ngDoCheck')
  }

  ngAfterContentInit() {
    console.log('ngAfterContentInit')
  }

  ngAfterContentChecked() {
    console.log('ngAfterContentChecked')
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit')
  }

  ngAfterViewChecked() {
    console.log('ngAfterViewChecked')

    // 子コンポーネントの値poems
    this.children.forEach((item, index) => {
      if (this.poems[index] !== item.poem) {
        setTimeout(() => {
          this.poems[index] = item.poem
        }, 0)
      }
    })
  }

  ngOnDestroy() {
    console.log('ngOnDestroy')
  }

  toggle() {
    this.flag = (this.flag === 'on' ? 'off' : 'on')
    this.caption = (this.caption === 'オン' ? 'オフ' : 'オン')
  }

  // アニメーションの開始/終了時にイベント情報をログ出力
  onanim(e: Object) {
    console.log(e)
  }

  onHostClick(e: MouseEvent) {
    console.log(e)
  }
}
