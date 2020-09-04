import { Component, Output, EventEmitter, Input } from '@angular/core';

import { HeroTaxReturn } from '../hero-tax-return';
import { HeroTaxReturnService } from '../hero-tax-return.service';

@Component({
  selector: 'app-hero-tax-return',
  templateUrl: './hero-tax-return.component.html',
  styleUrls: ['./hero-tax-return.component.css'],
  // 各コンポーネントで別々のサービスインスタンスを利用できるようにコンポーネントのプロバイダーで登録
  providers: [
    HeroTaxReturnService,
  ]
})
export class HeroTaxReturnComponent {
  message = '';

  @Output() close = new EventEmitter<void>();

  @Input()
  get taxReturn(): HeroTaxReturn {
    // HeroTaxReturnServiceサービスからセットしてあるHeroTaxReturnを取得
    return this.heroTaxReturnService.taxReturn;
  }
  set taxReturn(htr: HeroTaxReturn) {
    // 親コンポーネントから受け取ったHeroTaxReturnをHeroTaxReturnServiceサービスにセット
    // ※オブジェクトの参照をセッターで監視しているため、オブジェクトの要素の値が変わるだけだとセッターは反応しない
    this.heroTaxReturnService.taxReturn = htr;
  }

  constructor(private heroTaxReturnService: HeroTaxReturnService) { }

  onCanceled(): void {
    this.flashMessage('Canceled');
    // heroTaxReturnを元に戻す
    this.heroTaxReturnService.restoreTaxReturn();
  }

  onClose(): void {
    this.close.emit();
  }

  onSaved(): void {
    this.flashMessage('Saved');
    // heroTaxReturnを保存する
    this.heroTaxReturnService.saveTaxReturn();
  }

  // 一時的なメッセージの表示
  flashMessage(msg: string): void {
    this.message = msg;
    setTimeout(() => this.message = '', 500); // 500ms後にメッセージを空にする
  }

}
