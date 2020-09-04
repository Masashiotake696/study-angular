import { Injectable } from '@angular/core';

import { of, Observable } from 'rxjs';

import { Villain } from './villain';

@Injectable()
export class VillainsService {
  villains: Villain[] = [
    { id: 1, name: 'Dr. Evil'},
    { id: 2, name: 'Moriarty'}
  ];

  getVillains(): Observable<Villain[]> {
    return of(this.villains);
  }
}
