import { Component } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-compose-message',
  templateUrl: './compose-message.component.html',
  styleUrls: ['./compose-message.component.css']
})
export class ComposeMessageComponent {
  details: string;
  message: string;
  sending = false;

  constructor(private router: Router) { }

  send(): void {
    this.sending = true;
    this.details = 'Sengind Message...';

    setTimeout(() => {
      // closePopupでこのコンポーネントはデストロイされるためクラスプロパティを初期化する必要はない
      this.closePopup();
    }, 1000);
  }

  cancel(): void {
    this.closePopup();
  }

  private closePopup(): void {
    // ルーティングで指定していたname="popup"のoutletのパスをnullで上書き
    this.router.navigate([{ outlets: { popup: null } }]);
  }
}
