import { Component, Input, OnChanges, OnInit, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy, SimpleChanges } from '@angular/core'

@Component({
  selector: 'my-child',
  template: `
    <div>現在時刻は{{ time.toLocaleString() }}</div>
  `
})
export class ChildComponent implements OnChanges, OnInit, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {
  @Input() time: Date

  constructor() {
    console.log('[child] constructor')
  }

  // ライフサイクルメソッド（それぞれのタイミングでログを表示）
  ngOnInit() {
    console.log('[child] ngOnInit')
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('[child] ngOnChanges')

    // 全ての変更を順に取得
    for (let prop in changes) {
      let change = changes[prop]
      console.log(`${prop}：${change.previousValue} => ${change.currentValue}`)
    }
  }

  ngDoCheck() {
    console.log('[child] ngDoCheck')
  }

  ngAfterContentInit() {
    console.log('[child] ngAfterContentInit')
  }

  ngAfterContentChecked() {
    console.log('[child] ngAfterContentChecked')
  }

  ngAfterViewInit() {
    console.log('[child] ngAfterViewInit')
  }

  ngAfterViewChecked() {
    console.log('[child] ngAfterViewChecked')
  }

  ngOnDestroy() {
    console.log('[child] ngOnDestroy')
  }
}
