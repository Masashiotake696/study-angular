import { Component } from '@angular/core';

import { Item } from './item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  clickMessage: string;
  currentItem: Item = {
    name: 'test'
  };

  onSave(event: MouseEvent): void {
    const message = event ? ' Event target is ' + (event.target as HTMLElement).textContent : '';
    console.log(`Save: ${message}`);
  }

  deleteItem(item: Item): void {
    console.log(`Delete item: ${item.name}`);
  }
}
