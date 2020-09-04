import { Component } from '@angular/core';

import { Observable } from 'rxjs';

import { Villain } from '../villain';
import { VillainsService } from '../villains.service';

@Component({
  selector: 'app-villains-list',
  templateUrl: './villains-list.component.html',
  // VillainsServiceの利用をこのコンポーネントと、このコンポーネントのサブコンポーネントツリーに絞る
  providers: [ VillainsService ]
})
export class VillainsListComponent {
  villains$: Observable<Villain[]>;

  constructor(villainsService: VillainsService) {
    this.villains$ = villainsService.getVillains();
  }
}
