import { Injectable, OnDestroy } from '@angular/core';

import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export class Item {
  constructor(public id: number, public name: string) {}
}

const ITEMS: Item[] = [
  new Item(1, 'Sticky notes'),
  new Item(2, 'Dry erase markers'),
  new Item(3, 'Erasers'),
  new Item(4, 'Whiteboard cleaner'),
];

const FETCH_LATENCY = 500;

@Injectable()
export class ItemsService implements OnDestroy {

  constructor() {
    console.log('ItemService instance created.');
  }

  ngOnDestroy(): void {
    console.log('ItemService instance destroyed');
  }

  getItems(): Observable<Item[]> {
    return of(ITEMS).pipe(delay(FETCH_LATENCY));
  }

  getItem(id: number | string): Observable<Item> {
    const items$ = of(ITEMS.find(item => item.id === +id));
    return items$.pipe(delay(FETCH_LATENCY));
  }
}
