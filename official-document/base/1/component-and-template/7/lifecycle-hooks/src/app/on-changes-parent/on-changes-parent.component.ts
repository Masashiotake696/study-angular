import { Component, ViewChild } from '@angular/core';

import { Hero } from '../hero';
import { OnChangesComponent } from '../on-changes/on-changes.component';

@Component({
  selector: 'app-on-changes-parent',
  templateUrl: './on-changes-parent.component.html',
  styleUrls: ['./on-changes-parent.component.css']
})
export class OnChangesParentComponent {
  hero: Hero;
  power: string;
  title = 'OnChanges';

  @ViewChild(OnChangesComponent) childView: OnChangesComponent;

  constructor() {
    this.reset();
  }

  reset(): void {
    // 新しく作成したオブジェクトを格納
    this.hero = new Hero('Windstorm');
    this.power = 'sing';
    // 子コンポーネントをリセット
    if (this.childView) {
      this.childView.reset();
    }
  }
}
