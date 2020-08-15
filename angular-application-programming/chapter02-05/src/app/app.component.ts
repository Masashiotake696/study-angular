import { Component, OnInit, OnDestroy } from '@angular/core'
import { DomSanitizer, SafeHtml, SafeResourceUrl } from '@angular/platform-browser'
import { EventComponent } from './event.component'
import { BookComponent } from './book.component'
import { WingsComponent } from './wings.component'
import { Http, Headers, RequestOptions } from '@angular/http'
import { FormControl, Validators, FormBuilder } from '@angular/forms'

interface Member {
  name: string
  age: number
}

interface Book2 {
  isbn: string
  title: string
}

@Component({
  selector: 'my-app',
  template: `
    <!-- Interpolation（補間）構文 -->
    <div>
      <h1>Hello {{name}}</h1>
      <div>{{ member?.name }}</div>
    </div>

    <hr />

    <!-- プロパティバインディング -->
    <div>
      <img [src]="image" />
      <div [innerHTML]="message"></div>
      <div [innerHTML]="safeMessage"></div>
      <!-- Error：urlの値がセキュリティホールになりうる -->
      <!-- <iframe [src]="url"></iframe> -->
      <iframe [src]="safeUrl"></iframe>
    </div>

    <hr />

    <!-- 属性バインディング -->
    <div>
      <table border="1">
        <tr>
          <!-- Error：rowspanプロパティは<td>要素には存在しない -->
          <!-- <td [rowspan]="len">結合</td> -->
          <td [attr.rowSpan]="len">結合</td>
          <td>1</td>
        </tr>
        <tr>
          <td>2</td>
        </tr>
        <tr>
          <td>3</td>
        </tr>
      </table>
    </div>

    <hr />

    <!-- クラスバインディング -->
    <div>
      <!-- プロパティバインディングでのclass指定（あらかじめclass属性で設定されていた「line」と「back」は打ち消されてしまう） -->
      <div class="line back" [class]="clazz">WINGSプロジェクト</div>
      <!-- クラスバインディング（クラスバインディングで指定された「fore」は既存の「line」と「back」を打ち消すことなく追加される） -->
      <div class="line back" [class.fore]="flag">WINGSプロジェクト</div>
      <!-- クラスバインディングの複数指定 -->
      <div class="line" [class.fore]="flag" [class.back]="flag2">WINGSプロジェクト</div>
    </div>

    <hr />

    <!-- スタイルバインディング -->
    <div>
      <div [style.background-color]="bcolor">WINGSプロジェクト</div>
      <!-- 式の値によってオンとオフを切り替える -->
      <div [style.background-color]="bcolorFlag ? '#0ff' : ''">WINGSプロジェクト</div>
      <!-- スタイルバインディングの複数指定 -->
      <div [style.background-color]="bcolor" [style.color]="color">WINGSプロジェクト</div>
      <!-- 単位付きスタイルバインディング -->
      <div [style.font-size.%]="size">WINGSプロジェクト</div>
    </div>

    <hr />

    <!-- イベントバインディング -->
    <div>
      <!-- clickイベント -->
      <input type="button" (click)="show($event)" value="現在時刻" />
      {{ eventMessage }}
      <!-- mousemoveイベント -->
      <div id="main" style="margin: 50px; width: 300px; height: 300px; border: solid 1px #000;" (mousemove)="showMousemove($event)">
        <p>screen: {{ screenX }}x{{ screenY }}</p>
        <p>page: {{ pageX }}x{{ pageY }}</p>
        <p>client: {{ clientX }}x{{ clientY }}</p>
        <p>offset: {{ offsetX }}x{{ offsetY }}</p>
      </div>
      <!-- keydownイベント -->
      <form>
        <label for="key">キー入力：</label>
        <input id="key" name="key" (keydown)="showKeyDown($event)" />
      </form>
      <div>キーコード：{{ which }}</div>
      <div [hidden]="!altKey">[Alt]</div>
      <div [hidden]="!ctrlKey">[Ctrl]</div>
      <div [hidden]="!shiftKey">[Shift]</div>
      <!-- keypressイベント(preventDefault) -->
      <form>
        <label for="zip">郵便番号：</label>
        <input id="zip" name="zip" type="text" size="10" (keypress)="mask($event)" />
      </form>
      <!-- clickイベント(stopPropagation) -->
      <div id="outer" (click)="onclick1()">
        outer
        <div id="inner" (click)="onclick2($event)">inner</div>
      </div>
      <!-- テンプレート参照変数 -->
      <input id="txt" name="txt" type="text" (input)="showInput($event)" />
      <ul [innerHTML]="inputMessage"></ul>
      <input #txt2 id="txt2" name="txt2" type="text" (input)="showInput2(txt2.value)" />
      <ul [innerHTML]="inputMessage2"></ul>
      <label>姓：<input #last_name type="text" (input)="0" /></label><br />
      <label>名：<input #first_name type="text" (input)="0" /></label>
      <div>こんにちは、{{ last_name.value }}{{ first_name.value }}さん！</div>
      <!-- keyup.enterイベント -->
      <input id="keyupenter" name="keyupenter" type="text" (keyup.enter)="showKeyupEnter($event)" />
      <ul [innerHTML]="keyupEnterMessage"></ul>
    </div>

    <hr />

    <!-- 双方向バインディング -->
    <div>
      <form>
        <label for="name">名前：</label>
        <input id="name" name="name" type="text" [(ngModel)]="myName" />
        <div>こんにちは、{{ myName }}さん！</div>
      </form>
      <form>
        <label for="name2">名前：</label>
        <input id="name2" name="name2" type="text" [ngModel]="myName2" (input)="myName2 = $event.target.value" />
        <div>こんにちは、{{ myName2 }}さん！</div>
      </form>
      <form>
        <label for="name3">名前：</label>
        <input id="name3" name="name3" type="text" [ngModel]="myName3" (ngModelChange)="myName3 = $event" />
        <div>こんにちは、{{ myName3 }}さん！</div>
      </form>
      <form>
        <label for="name4">名前：</label>
        <input id="name4" name="name4" type="text" [ngModel]="myName4" (ngModelChange)="toUpper($event)" />
        <div>こんにちは、{{ myName4 }}さん！</div>
      </form>
    </div>

    <hr />

    <!-- パイプ -->
    <div>
      <p>{{ price | currency: 'JPY' }}</p>

      <p>元の文字列：{{ title }}</p>
      <p>uppercase：{{ title | uppercase }}</p>
      <p>lowercase：{{ title | lowercase }}</p>
      <p>titlecase：{{ title | titlecase }}</p>

      <!-- ※プロパティ値がfunction型、またはundefinedの場合は無視される -->
      <pre>{{ obj | json }}</pre>

      <ul>
        <li>{{ str }}</li>
        <li>{{ str | slice: 3 }}</li>
        <li>{{ str | slice: 3: 5}}</li>
        <li>{{ str | slice: 7}}</li>
        <li>{{ str | slice: -3}}</li>
        <li>{{ str | slice: -3: -2}}</li>
        <li>{{ str | slice: -10}}</li>
      </ul>
      <ul>
        <li>{{ str_array }}</li>
        <li>{{ str_array | slice: 3 }}</li>
        <li>{{ str_array | slice: 3: 5}}</li>
        <li>{{ str_array | slice: 7}}</li>
        <li>{{ str_array | slice: -3}}</li>
        <li>{{ str_array | slice: -3: -2}}</li>
        <li>{{ str_array | slice: -10}}</li>
      </ul>

      <ul>
        <li>デフォルト：{{ float_price | number }}</li>
        <li>少数第二位：{{ float_price | number: '5.0-2' }}</li>
        <li>整数：{{ float_price | number: '1.0-0' }}</li>
      </ul>

      <ul>
        <li>デフォルト：{{ float_price | currency }}</li>
        <li>コード：{{ float_price | currency: 'JPY' }}</li>
        <li>単位（円）：{{ float_price | currency: 'JPY': true }}</li>
        <li>単位（ユーロ）：{{ float_price | currency: 'EUR': true }}</li>
        <li>桁数指定：{{ float_price | currency: 'JPY': true: '1.0-1' }}</li>
      </ul>

      <ul>
        <li>デフォルト：{{ num | percent }}</li>
        <li>少数第一位：{{ num | percent: '1.0-1' }}
      </ul>

      <ul>
        <li>整形なし：{{ current | date }}</li>
        <li>整形あり（デフォルト）：{{ current | date }}</li>
        <li>整形あり（medium）：{{ current | date: 'medium' }}</li>
        <li>整形あり（書式指定）：{{ current | date: 'y MM dd (EEE)' }}</li>
      </ul>

      <div>{{ favs.length | i18nPlural: plural_messages }}</div>

      <li *ngFor="let member of members">
        {{ member.sex | i18nSelect: select_messages }}は{{ member.name }}です。
      </li>
    </div>

    <hr />

    <!-- 構造ディレクティブ -->
    <div>
      <form>
        <label for="show">表示/非表示</label>
        <input id="show" name="show" type="checkbox" [(ngModel)]="showBox" />
      </form>
      <!-- ngIfディレクティブは条件式の審議に応じて、該当する要素を文書ツリーに挿入/破棄する -->
      <div *ngIf="showBox; else elseContent">
        <p>WINGSプロジェクトは、当初、ライター...</p>
      </div>
      <div *ngIf="showBox; then trueContent; else elseContent">
        <p>この部分は無視される</p>
      </div>
      <ng-template #trueContent>
        <p>WINGSプロジェクトは、当初、ライター山田のサポート...</p>
      </ng-template>
      <ng-template #elseContent>
        <h3 style="color: Red;">非表示中です。</h3>
      </ng-template>
      <!-- 初期化に高いオーバーヘッドを要する場合は、スタイルバインディングでdisplayスタイルプロパティを使用する -->
      <div [style.display]="showBox ? 'inline' : 'none'">
        <p>WINGSプロジェクトは、当初、ライター...</p>
      </div>

      <form>
        <!-- 選択ボックスをseasonプロパティに紐付け -->
        <select name="season" [(ngModel)]="season">
          <option value="">四季を選択</option>
          <option value="spring">春</option>
          <option value="summer">夏</option>
          <option value="autumn">秋</option>
          <option value="winter">冬</option>
        </select>
      </form>
      <!-- seasonプロパティの値に応じて、対応するテキストを表示 -->
      <div [ngSwitch]="season">
        <span *ngSwitchCase="'spring'">春はあけぼの...</span>
        <span *ngSwitchCase="'summer'">夏は夜...</span>
        <span *ngSwitchCase="'autumn'">秋は夕暮れ...</span>
        <span *ngSwitchCase="'winter'">冬はつとめて...</span>
        <span *ngSwitchDefault>選択してください</span>
      </div>

      <table class="table">
        <tr>
          <th>ISBNコード</th>
          <th>書名</th>
          <th>価格</th>
          <th>出版社</th>
        </tr>
        <!-- 書籍情報booksを順に取り出し、テーブル列に整形 -->
        <tr *ngFor="let book of books">
          <td>{{ book.isbn }}</td>
          <td>{{ book.title }}</td>
          <td>{{ book.price }}円</td>
          <td>{{ book.publisher }}</td>
        </tr>
      </table>

      <table class="table">
        <tr>
          <th>値</th>
          <th>index</th>
          <th>first</th>
          <th>last</th>
          <th>odd</th>
          <th>even</th>
        </tr>
        <tr *ngFor="let object of data; index as index; first as first; last as last; odd as odd; even as even;">
          <td>{{ object }}</td>
          <td>{{ index }}</td>
          <td>{{ first ? '○' : '-' }}</td>
          <td>{{ last ? '○' : '-' }}</td>
          <td>{{ odd ? '○' : '-' }}</td>
          <td>{{ even ? '○' : '-' }}</td>
        </tr>
      </table>

      <ng-container *ngFor="let article of articles">
        <header>{{ article.title }}</header>
        <div>{{ article.body }}</div>
        <footer>({{ article.author }})</footer>
      </ng-container>

      <ul>
        <li *ngFor="let book2 of books2; trackBy: trackFn">
          {{ book2.title }} ({{ book2.isbn }})
        </li>
        <input type="button" (click)="updateBooks2()" value="更新" />
      </ul>

      <table class="table">
        <tr>
          <th>ISBNコード</th>
          <th>書名</th>
          <th>価格</th>
          <th>出版社</th>
        </tr>
        <tr *ngFor="let book of books | slice: start: start+length">
          <td>{{ book.isbn }}</td>
          <td>{{ book.title }}</td>
          <td>{{ book.price }}円</td>
          <td>{{ book.publisher }}</td>
        </tr>
        <!-- ページャー -->
        <ul class="pagination">
          <li><a href="#" (click)="pager(0)">1</a></li>
          <li><a href="#" (click)="pager(1)">2</a></li>
          <li><a href="#" (click)="pager(2)">3</a></li>
        </ul>
      </table>

      <div [ngStyle]="style">
        <p>WINGSプロジェクトは、当初、ライター...</p>
      </div>

      <input type="button" (click)="back=!back" value="背景色" />
      <input type="button" (click)="fore=!fore" value="前景色" />
      <input type="button" (click)="space=!space" value="余白" />
      <div [ngStyle]="styles">
        <p>WINGSプロジェクトは、当初、ライター...</p>
      </div>

      <form>
        <input type="button" (click)="styles2.back=!styles2.back" value="背景色" />
        <input type="button" (click)="styles2.fore=!styles2.fore" value="前景色" />
        <input type="button" (click)="styles2.space=!styles2.space" value="余白" />
      </form>
      <div [ngClass]="styles2">
        <p>WINGSプロジェクトは、当初、ライター...</p>
      </div>

      <form>
        <input type="button" (click)="classFalg=!classFalg" value="有効/無効" />
      </form>
      <div [ngClass]="{'back fore space': classFalg}">
        <p>WINGSプロジェクトは、当初、ライター...</p>
      </div>
      <div ngClass="back fore space">
        <p>WINGSプロジェクトは、当初、ライター...</p>
      </div>

      <div [ngPlural]="favs.length">
        <ng-template ngPluralCase="=0">
          👍 されていません。
        </ng-template>
        <ng-template ngPluralCase="=1">
          {{ favs[0] }}だけ 👍 といってくれています。
        </ng-template>
        <ng-template ngPluralCase="other">
          {{ favs.length }}人が 👍 といってくれています。
        </ng-template>
      </div>

      <!-- テンプレートを準備 -->
      <ng-template #myTemp let-isbn="isbn" let-title="title" let-price="price" let-publisher="publisher">
        <div>
          <img src="http://www.wings.msn.to/books/{{isbn}}/{{isbn}}.jpg" />
          <ul>
            <li>{{ title }}</li>
            <li>{{ publisher }}発行</li>
            <li>定価 {{ price }}円</li>
          </ul>
        </div>
      </ng-template>
      <!-- booksプロパティの情報をもとに選択ボックスを生成（選択肢はtempに反映） -->
      <select name="temp" [(ngModel)]="temp">
        <option *ngFor="let book of books; index as index;" [value]="index">
          {{ book.title }}
        </option>
      </select>
      <ng-container *ngTemplateOutlet="myTemp; context: books[temp]">
      </ng-container>

      <ng-template #myTemp2 let-greet let-name="name">
        <div>{{ greet }}、{{ name }}さん！</div>
      </ng-template>
      <ng-container *ngTemplateOutlet="myTemp2; context: templateData">
      </ng-container>

      <div>
        広告バナー：<br />
        <ng-container *ngComponentOutlet="banner"></ng-container>
      </div>
    </div>

    <hr />

    <!-- フォーム開発 -->
    <div>
      <form #myForm="ngForm" (ngSubmit)="showForm()" class="form">
        <div>
          <label for="email">メールアドレス：</label><br />
          <input id="email" name="email" type="email" [(ngModel)]="user.email" #email="ngModel" required email />
          <span *ngIf="email.errors?.required && email.dirty">メールアドレスは必須です。</span>
          <span *ngIf="email.errors?.email && email.dirty">メールアドレスを正しい形式で入力してください。</span>
        </div>
        <div>
          <label for="password">パスワード：</label><br />
          <input id="password" name="password" type="password" [(ngModel)]="user.password" #password="ngModel" required minlength="6" />
          <span *ngIf="password.errors?.required && password.dirty">パスワードは必須です。</span>
          <span *ngIf="password.errors?.minlength && password.dirty">パスワードは6文字以上で入力してください。</span>
        </div>
        <div>
          <label for="kanji_name">名前（漢字）：</label><br />
          <input id="kanji_name" name="kanji_name" type="text" [(ngModel)]="user.kanji_name" #kanji_name="ngModel" required minlength="3" maxlength="10" />
          <span *ngIf="kanji_name.errors?.required && kanji_name.dirty">名前（漢字）は必須です。</span>
          <span *ngIf="kanji_name.errors?.minlength && kanji_name.dirty">名前（漢字）は3文字以上で入力してください。</span>
          <span *ngIf="kanji_name.errors?.maxlength && kanji_name.dirty">名前（漢字）は10文字以内で入力してください。</span>
        </div>
        <div>
          <label for="memo">備考：</label><br />
          <textarea id="memo" name="memo" rows="5" cols="30" [(ngModel)]="user.memo" #memo="ngModel" maxlength="10"></textarea>
          <span *ngIf="memo.errors?.maxlength && memo.dirty">備考は10文字以内で入力してください。</span>
        </div>
        <div>
          <input type="submit" value="送信" [disabled]="myForm.invalid || myForm.submitted" />
          <input type="reset" value="リセット" [disabled]="myForm.pristine" />
        </div>
      </form>
      <pre>{{ myForm.value | json }}</pre>

      <form>
        <ng-container *ngFor="let animal of user.animals; index as index">
          <label>
            <input type="radio" name="animal" [(ngModel)]="selected_animal" [value]="animal.value" [checked]="selected_animal === animal.value" (change)="showRadioLog(index)" />
            {{ animal.label }}
          </label>
        </ng-container>
      </form>
      <form>
        <ng-container *ngFor="let animal2 of user.animals2; index as index">
          <label>
            <input type="checkbox" name="animal2{{index}}" [(ngModel)]="animal2.selected" [value]="animal2.value" (change)="showCheckboxLog()">
            {{ animal2.label }}
          </label>
        </ng-container>
      </form>
      <form>
        <select name="animal3" [(ngModel)]="selected_animal3" (change)="showSelectLog()">
          <option value="">ペットを選択してください</option>
          <option *ngFor="let animal3 of user.animals3" [value]="animal3.value" [disabled]="animal3.disabled" [selected]="selected_animal3 === animal3.value">{{ animal3.label }}</option>
        </select>
      </form>
      <form>
        <select name="animal4" [(ngModel)]="selected_animal_groups" (change)="showSelectGroupLog()">
          <option value="">ペットを選択してください</option>
          <optgroup *ngFor="let animal_group of animalGroupsKeys(user.animal_groups)" [label]="animal_group">
            <option *ngFor="let animal of user.animal_groups[animal_group]" [value]="animal.value" [disabled]="animal.disabled" [selected]="selected_animal_groups === animal.value">{{ animal.label }}</option>
          </optgroup>
        </select>
      </form>

      <form>
        <textarea cols="70" row="5" name="tweet" [(ngModel)]="tweet" (input)="setcolor()"></textarea>
        <div [ngStyle]="myStyle">{{ tweet_character_remain_count }}</div>
      </form>

      <form>
        <label for="mail">メールアドレス：</label>
        <textarea id="mail" name="mail" [ngModel]="emails.join(';')" (ngModelChange)="splitEmail($event)"></textarea>
      </form>
      <ul>
        <li *ngFor="let email of emails">{{ email }}</li>
      </ul>

      <form>
        <input id="upfile" name="upfile" type="file" #file accept="image/*" (change)="upload(file.files)" />
      </form>

      <form [formGroup]="myForm2" (ngSubmit)="showForm2()">
        <div>
          <label for="user_email">メールアドレス：</label>
          <input id="user_email" name="user_email" type="email" [formControl]="user_email" />
          <span *ngIf="user_email.errors?.required && user_email.dirty">メールアドレスは必須です。</span>
          <span *ngIf="user_email.errors?.email && user_email.dirty">メールアドレスを正しい形式で入力してください。</span>
        </div>
        <div>
          <label for="user_password">パスワード：</label>
          <input id="user_password" name="user_password" type="password" [formControl]="user_password" />
          <span *ngIf="user_password.errors?.required && user_password.dirty">パスワードは必須です。</span>
          <span *ngIf="user_password.errors?.minlength && user_password.dirty">パスワードは6文字以上で入力してください。</span>
        </div>
        <div>
          <label for="user_name">名前（漢字）：</label>
          <input id="user_name" name="user_name" type="text" [formControl]="user_name" />
          <span *ngIf="user_name.errors?.required && user_name.dirty">名前（漢字）は必須です。</span>
          <span *ngIf="user_name.errors?.minlength && user_name.dirty">名前（漢字）は3文字以上で入力してください。</span>
          <span *ngIf="user_name.errors?.maxlength && user_name.dirty">名前（漢字）は10文字以内で入力してください。</span>
        </div>
        <div>
          <label for="user_memo">備考：</label>
          <input id="user_memo" memo="user_memo" type="text" [formControl]="user_memo" />
          <span *ngIf="user_memo.errors?.maxlength && user_memo.dirty">備考は10文字以内で入力してください。</span>
        </div>
        <div>
          <input type="submit" value="送信" [disabled]="myForm2.invalid" />
        </div>
      </form>
    </div>
  `,
  styles: [`
    .line {
      border: solid 1px #f00;
    }
    .back {
      background-color: #0ff;
    }
    .fore {
      color: Red;
    }
    .space {
      padding: 15px;
    }
  `],
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  name = 'Angular'

  member: Member = {
    name: '山田太郎',
    age: 30
  }

  image = 'http://www.wings.msn.to/image/wings.jpg'

  // innerHTMLで埋め込むことができるが、<script>/<button>/<input>要素や、<div>要素のstyle属性などは除去される
  message = `
    <script>window.alert("ようこそ!");</script>
    <div style="font-size: 20px;">
      <p>WINGSプロジェクト</p>
    </div>
    <a href="http://www.wings.msn.to/">Web</a>
    <button>同意する</button>
    <input type="button" onclick="alert('OK')" value="クリック" />
  `

  safeMessage: SafeHtml

  // iframeのsrcに埋め込むとセキュリティホールとしてエラーになる
  url = 'http://www.wings.msn.to/'

  safeUrl: SafeResourceUrl

  len = 3

  clazz = 'fore'

  flag = true

  flag2 = false

  bcolor = '#0ff'

  bcolorFlag = true

  color = 'Red'

  size = 150

  eventMessage = '---'

  screenX = 0
  screenY = 0
  pageX = 0
  pageY = 0
  clientX = 0
  clientY = 0
  offsetX = 0
  offsetY = 0

  which: string | number = ''
  altKey = false
  ctrlKey = false
  shiftKey = false

  inputMessage = ''
  inputMessage2 = ''

  keyupEnterMessage = ''

  myName = '山田'
  myName2 = '鈴木'
  myName3 = '吉田'
  myName4 = 'SATO'

  price = 1000

  title = 'WINGS project'

  obj: any = {
    name: 'トクジロウ',
    gender: undefined,
    birth: new Date(2007, 7, 15),
    age: 3,
    family: ['リンリン', 'サチ', 'ニンザブロウ'],
    work: function () { },
    other: {
      favorite: 'ひまわり',
      memo: '理屈爺さん'
    }
  }

  str = 'いろはにほへと'
  str_array = ['い', 'ろ', 'は', 'に', 'ほ', 'へ', 'と']

  float_price = 3500.1256

  num = 0.123456

  current = new Date()

  favs = ['山田理央', '鈴木洋平', '腰掛奈美']
  plural_messages = {
    '=0': '👍 されていません。',
    '=1': '1人だけ 👍 といってくれています。',
    'other': '#人が 👍 といってくれています。'
  }

  members = [
    { name: '山田理央', sex: 'female' },
    { name: '鈴木洋平', sex: 'male' },
    { name: '腰掛奈美', sex: 'unknown' }
  ]
  select_messages = {
    'male': '彼',
    'female': '彼女',
    'other': '彼/彼女'
  }

  showBox = false

  season = ''

  books = [
    {
      isbn: '978-4-7741-8411-1',
      title: '改訂新版JavaScript本格入門',
      price: 2980,
      publisher: '技術評論社'
    },
    {
      isbn: '978-4-7980-4853-6',
      title: 'はじめてのAndroidアプリ開発 第二版',
      price: 3200,
      publisher: '秀和システム'
    },
    {
      isbn: '978-4-7741-8083-4',
      title: '[改訂新版] Javaポケットリファレンス',
      price: 2680,
      publisher: '技術評論社'
    },
    {
      isbn: '978-4-7981-3547-2',
      title: '独習PHP 第三版',
      price: 3200,
      publisher: '翔泳社'
    },
    {
      isbn: '978-4-8222-9893-7',
      title: '基礎からしっかり学ぶC++の教科書',
      price: 2800,
      publisher: '日経BP社'
    }
  ]

  data = [
    '子', '丑', '寅', '卯', '辰', '巳', '牛', '未', '酉', '申', '戌', '亥'
  ]

  articles = [
    {
      title: '改訂新版JavaScript本格入門',
      body: '「ECMAScript2015」による新記法はもちろん...',
      author: '山田祥寛'
    },
    {
      title: 'Swiftポケットリファレンス',
      body: 'iOSのフレームワークの解説から全く新しい...',
      author: 'テスト太郎'
    },
    {
      title: '[改訂新版] Javaポケットリファレンス',
      body: '初版でのJava SE 6までの標準ライブラリに...',
      author: 'テスト次郎'
    }
  ]

  books2: Book2[] = [
    {
      isbn: '978-4-7741-8411-1',
      title: '改訂新版JavaScript本格入門',
    },
    {
      isbn: '978-4-7980-4853-6',
      title: 'はじめてのAndroidアプリ開発 第二版',
    },
    {
      isbn: '978-4-7741-8083-4',
      title: '[改訂新版] Javaポケットリファレンス',
    }
  ]

  start = 0
  length = 3

  style = {
    backgroundColor: '#000',
    color: '#fff',
    fontWeight: 'bold',
    margin: '15px',
    padding: '15px'
  }

  back = false
  fore = false
  space = false

  styles2 = {
    back: false,
    fore: false,
    space: false
  }

  classFalg = false

  temp = 0

  templateData = {
    $implicit: 'こんにちは',
    name: '山田'
  }

  interval: any // タイマー
  components = [EventComponent, BookComponent, WingsComponent]
  currentComponentIndex = 0 // 現在のコンポーネント（インデックス値）
  banner: any = EventComponent // 現在のコンポーネント（オブジェクト）

  user = {
    email: 'hoge@example.com',
    password: '',
    kanji_name: '名無権兵衛',
    memo: 'メモ',
    animals: [
      { label: '犬', value: 'dog' },
      { label: '猫', value: 'cat' },
      { label: 'ハムスター', value: 'hamster' },
      { label: '金魚', value: 'fish' },
      { label: '亀', value: 'turtle' },
    ],
    animals2: [
      { label: '犬', value: 'dog', selected: false },
      { label: '猫', value: 'cat', selected: true },
      { label: 'ハムスター', value: 'hamster', selected: true },
      { label: '金魚', value: 'fish', selected: false },
      { label: '亀', value: 'turtle', selected: false },
    ],
    animals3: [
      { label: '犬', value: 'dog', disabled: false },
      { label: '猫', value: 'cat', disabled: false },
      { label: 'ハムスター', value: 'hamster', disabled: false },
      { label: '金魚', value: 'fish', disabled: true },
      { label: '亀', value: 'turtle', disabled: false },
    ],
    animal_groups: {
      '哺乳類': [
        { label: '犬', value: 'dog', disabled: false },
        { label: '猫', value: 'cat', disabled: false },
        { label: 'ハムスター', value: 'hamster', disabled: false },
      ],
      '魚類': [
        { label: '金魚', value: 'fish', disabled: true },
        { label: '鯉', value: 'carp', disabled: false },
        { label: '熱帯魚', value: 'tropical fish', disabled: false },
      ],
      '爬虫類': [
        { label: '亀', value: 'turtle', disabled: false },
        { label: 'トカゲ', value: 'lizard', disabled: false },
        { label: 'ヘビ', value: 'snake', disabled: false },
      ]
    }
  }
  selected_animal = 'hamster'
  selected_animal3 = 'hamster'
  selected_animal_groups = 'dog'

  tweet = '' // テキストエリアの初期値
  tweet_character_max = 140 // 入力可能な最大長
  tweet_character_remain_count = this.tweet_character_max // 入力可能な残り文字数
  myStyle = { // 残り文字数のスタイル
    color: '#00f',
    fontWeight: 'normal'
  }

  emails: string[] = []

  user_email = new FormControl('hoge@example.com', [
    Validators.required,
    Validators.email,
  ])
  user_password = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ])
  user_name = new FormControl('名無権兵衛', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(10),
  ])
  user_memo = new FormControl('メモ', [
    Validators.maxLength(10),
  ])

  myForm2 = this.builder.group({
    user_email: this.user_email,
    user_password: this.user_password,
    user_name: this.user_name,
    user_memo: this.user_memo
  })

  constructor(private sanitizer: DomSanitizer, private http: Http, private builder: FormBuilder) { // Httpサービスを有効化, FormBuilderオブジェクトを生成
    // 文字列が信頼済みであることをマークする（DomSanitizer#bypassSecurityTrustHtml）
    this.safeMessage = sanitizer.bypassSecurityTrustHtml(this.message)
    // リソースが信頼済みであることをマークする（DomSanitizer#bypassSecurityTrustResourceUrl）
    this.safeUrl = sanitizer.bypassSecurityTrustResourceUrl(this.url)
  }

  show(e: MouseEvent) {
    this.eventMessage = new Date().toLocaleDateString()
    console.log(e)
  }

  showMousemove(e: MouseEvent) {
    this.screenX = e.screenX
    this.screenY = e.screenY
    this.pageX = e.pageX
    this.pageY = e.pageY
    this.clientX = e.clientX
    this.clientY = e.clientY
    this.offsetX = e.offsetX
    this.offsetY = e.offsetY
  }

  showKeyDown(e: KeyboardEvent) {
    console.log(e)
    this.which = e.which
    this.altKey = e.altKey
    this.ctrlKey = e.ctrlKey
    this.shiftKey = e.shiftKey
  }

  mask(e: KeyboardEvent) {
    let key = e.which
    if (!((key >= 48 && key <= 57) || key === 45 || key === 8 || key === 0)) {
      e.preventDefault();
    }
  }

  onclick1() {
    console.log('outerをクリックしました！')
  }

  onclick2(e: MouseEvent) {
    e.stopPropagation()
    console.log('innerをクリックしました！')
  }

  showInput(e: InputEvent) {
    this.inputMessage += `<li>${(e.target as HTMLInputElement).value}</li>`
  }

  showInput2(input: string) {
    this.inputMessage2 += `<li>${input}</li>`
  }

  showKeyupEnter(e: KeyboardEvent) {
    this.keyupEnterMessage += `<li>${(e.target as HTMLInputElement).value}</li>`
  }

  toUpper(input: string) {
    this.myName4 = input.toUpperCase()
  }

  updateBooks2() {
    this.books2 = [
      {
        isbn: '978-4-7741-8411-1',
        title: '改訂新版JavaScript本格入門'
      },
      {
        isbn: '978-4-7980-4853-6',
        title: 'はじめてのAndroidアプリ開発 第二版'
      },
      {
        isbn: '978-4-7741-8083-4',
        title: '[改訂新版] Javaポケットリファレンス'
      },
      {
        isbn: '978-4-7981-3547-2',
        title: '独習PHP 第三版'
      }
    ]
  }

  trackFn(index: number, book2: Book2) {
    return book2.isbn
  }

  pager(page: number) {
    this.start = this.length * page
  }

  get styles() {
    return {
      backgroundColor: this.back ? '#f00' : '',
      color: this.fore ? '#fff' : '#000',
      padding: this.space ? '15px' : '0px'
    }
  }

  // コンポーネント切り替えのためのタイマーを準備
  ngOnInit() {
    this.interval = setInterval(() => {
      // インデックスを更新し、コンポーネントを変更
      this.currentComponentIndex = (this.currentComponentIndex + 1) % this.components.length
      this.banner = this.components[this.currentComponentIndex]
    }, 3000)
  }

  // コンポーネント破棄の際にタイマーを破棄
  ngOnDestroy() {
    clearInterval(this.interval)
  }

  showForm() {
    console.log('名前（漢字）：' + this.user.kanji_name)
    console.log('備考：' + this.user.memo)
  }

  showRadioLog(index: number) {
    console.log('現在値（ラベル）：' + this.user.animals[index].label)
    console.log('現在値（値）：' + this.selected_animal)
  }

  showCheckboxLog() {
    console.log(this.user.animals2)
  }

  showSelectLog() {
    console.log('現在値：' + this.selected_animal3)
  }

  animalGroupsKeys(obj: Object) {
    return Object.keys(obj)
  }

  showSelectGroupLog() {
    console.log('現在値：' + this.selected_animal_groups)
  }

  // テキストエリアの変更を監視
  setcolor() {
    // 残り文字数を反映
    this.tweet_character_remain_count = this.tweet_character_max - this.tweet.length

    // 残り文字数に応じて、スタイルを変更
    if (this.tweet_character_remain_count > 10) {
      this.myStyle = {
        color: '#00f',
        fontWeight: 'normal'
      }
    } else if (this.tweet_character_remain_count > 0) {
      this.myStyle = {
        color: '#f0f',
        fontWeight: 'normal'
      }
    } else {
      this.myStyle = {
        color: '#f00',
        fontWeight: 'bold'
      }
    }
  }

  splitEmail(email: string) {
    this.emails = email.split(';')
  }

  // ファイルを選択したら、アップロードを実行
  upload(files: FileList) {
    // アップロードファイルがなければ、処理を中止
    if (files.length <= 0) {
      return
    }

    // アップロードファイルを準備
    const file = files[0]
    let data = new FormData()
    data.append('upfile', file, file.name)

    // サーバーにデータを送信
    this.http.post('app/upload.php', data)
      // 成功/失敗時には、それぞれ結果をログに表示
      .subscribe(
        data => console.log(data),
        error => console.log(error)
      )
  }

  // サブミット時に入力値を反映
  showForm2() {
    console.log('メールアドレス：' + this.user_email.value)
    console.log('パスワード：' + this.user_password.value)
    console.log('名前（漢字）：' + this.user_name.value)
    console.log('備考：' + this.user_memo.value)
    console.log('すべて：')
    console.log(this.myForm2.value)
  }
}
