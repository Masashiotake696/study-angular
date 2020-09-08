import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Crisis } from './crisis';
import { CRISES } from './mock-crises';
import { MessageService } from '../message.service';

@Injectable({
  providedIn: 'root'
})
export class CrisisService {
  // IDが被らないようにクラス変数として保持
  static nextCrisisId = 100;
  // BehaviorSubjectは流れてきた値を保持することができる
  private crises$: BehaviorSubject<Crisis[]> = new BehaviorSubject<Crisis[]>(CRISES);

  constructor(private messageService: MessageService) { }

  getCrises(): Observable<Crisis[]> {
    return this.crises$;
  }

  getCrisis(id: number | string): Observable<Crisis> {
    // 保持してあるcrisesのデータから引数で受け取ったIDに該当するデータを抽出
    return this.getCrises().pipe(
      map(crises => crises.find(crisis => crisis.id === +id)),
    );
  }

  // この関数は使われていない
  addCrisis(name: string): void {
    name = name.trim();
    if (name) {
      const crisis = { id: CrisisService.nextCrisisId++, name };
      CRISES.push(crisis);
      this.crises$.next(CRISES); // 次のストリームとして流す
    }
  }
}
