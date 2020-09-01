import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentItem = 'Television';

  items: string[] = [
    'item1',
    'item2',
    'item3',
    'item4',
  ];

  addItem(newItem: string): void {
    this.items.push(newItem);
    console.log(this.items);
  }

  crossOffItem(item: string): void {
    console.log(`Crossing off ${item}`);
  }
}
