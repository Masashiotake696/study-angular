import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <pre>{{ message }}</pre>
    <pre>{{ message | trim }}</pre>

    <hr />

    <textarea [(ngModel)]="memo" cols="50" rows="7"></textarea>
    <div [innerHTML]="memo | nl2br"></div>

    <hr />

    <textarea [(ngModel)]="memo2" cols="50" rows="7"></textarea>
    <div>{{ memo2 | truncate }}</div>
    <div>{{ memo2 | truncate: 20: '~' }}</div>

    <hr />

    <ul>
      <li *ngFor="let data of (data | grep: myFilter)">
        {{ data }}
      </li>
    </ul>

    <hr />

    <form>
      <label>
        キーワード：
        <input #text type="text" size="15" />
      </label>
      <input type="button" (click)="onclick(text.value)" value="追加" />
      <ul>
        <li *ngFor="let data of (data2 | grep: myFilter)">
          {{ data }}
        </li>
      </ul>
    </form>

    <hr />

    <p>
      JavaScript F/Wの代表例として良く挙げられるのが
      <span myColored>Angular</span>
      <!-- <span myColored myBgcolor="#f0f">Angular</span> -->
      <!-- <span myColored [myBgcolor]="color">Angular</span> -->
      <span myColored="#f0f">Angular</span>
      です
    </p>

    <hr />

    <form #myForm="ngForm">
      <label>
        郵便番号：
        <input type="text" name="zip" [(ngModel)]="data3.zip" #zip="ngModel" myZip />
      </label>
      <span *ngIf="zip.errors?.zip">郵便番号は999-9999の形式で入力してください</span>
    </form>

    <hr />

    <p>
      JavaScript F/Wの代表例として良く挙げられるのが
      <!-- 要素がテンプレート化されるが挿入処理を指定していないので、表示されない -->
      <span *myColored>Angular</span>
    </p>

    <hr />

    <div *myDeadline="end">
      <h2>ただいま全品半額セール中！</h2>
      <p>（ただし、食品。衣料品は除く）</p>
    </div>
  `,
})
export class AppComponent {
  message = '　　　WINGS Project　　　'
  memo = ''
  memo2 = ''
  data = ['あいうえお', 'かきくけ', 'さしす', 'たちつてと', 'な']
  data2 = ['あいうえお', 'かきくけ', 'さしす', 'たちつてと', 'な']
  color = '#0f0f';
  data3 = {
    zip: '673-0121'
  }
  end = new Date(2018, 2, 31)

  myFilter(value: string) {
    return String(value).length < 5
  }

  onclick(text: string) {
    this.data2.push(text)
    console.log(this.data2)
  }
}
