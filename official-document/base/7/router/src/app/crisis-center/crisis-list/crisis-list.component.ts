import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';

import { Crisis } from '../crisis';
import { CrisisService } from '../crisis.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-crisis-list',
  templateUrl: './crisis-list.component.html',
  styleUrls: ['./crisis-list.component.css']
})
export class CrisisListComponent implements OnInit {
  crises$: Observable<Crisis[]>;
  selectedId: number;

  constructor(
    private crisisService: CrisisService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.crises$ = this.route.paramMap.pipe(
      // switchMapで前の非同期処理が解決する前に次の処理が流れてきた場合に前の非同期処理をキャンセルする
      switchMap(params => {
        // パラメータからキーがidに該当するものを取得
        this.selectedId = +params.get('id');
        return this.crisisService.getCrises();
      })
    );
  }
}
