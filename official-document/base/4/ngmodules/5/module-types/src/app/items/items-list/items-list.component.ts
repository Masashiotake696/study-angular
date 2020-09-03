import { Component } from '@angular/core';

import { Observable } from 'rxjs';

import { Item, ItemsService } from '../items.service';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css']
})
export class ItemsListComponent {
  items$: Observable<Item[]>;

  constructor(itemsService: ItemsService) {
    this.items$ = itemsService.getItems();
  }

}
