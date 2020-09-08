import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Crisis } from '../crisis';
import { DialogService } from '../../dialog.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-crisis-detail',
  templateUrl: './crisis-detail.component.html',
  styleUrls: ['./crisis-detail.component.css']
})
export class CrisisDetailComponent implements OnInit {
  crisis: Crisis;
  editName: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public dialogService: DialogService,
  ) { }

  ngOnInit(): void {
    // ルーティングのresolveで注入されたデータからcrisisの情報を取得
    this.route.data.subscribe((data: { crisis: Crisis }) => {
      this.editName = data.crisis.name;
      this.crisis = data.crisis; // サービスで生成されたオブジェクトの参照を受け取る
    });
  }

  cancel(): void {
    this.gotoCrises();
  }

  save(): void {
    this.crisis.name = this.editName;
    this.gotoCrises();
  }

  // 一つ前の階層にパラメータ付きで遷移する
  gotoCrises(): void {
    const crisisId = this.crisis ? this.crisis.id : null;

    this.router.navigate(['../', { id: crisisId, foo: 'foo' }], {
      relativeTo: this.route
    });
  }

  // テキストボックスに変更を加えていた場合にページ遷移前に遷移確認を行う
  // trueで許可（次のページに遷移）、falseで不許可（次のページに遷移しない）
  canDeactivate(): Observable<boolean> | boolean {
    // Allow synchronous navigation (`true`) if no crisis or the crisis is unchanged
    if (!this.crisis || this.crisis.name === this.editName) {
      return true;
    }

    // Otherwise ask the user with the dialog service and return its observable which resolves to true or false when the user decides
    return this.dialogService.confirm('Discard changes?');
  }
}
