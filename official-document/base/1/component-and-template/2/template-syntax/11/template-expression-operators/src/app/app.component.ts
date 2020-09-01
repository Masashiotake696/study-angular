import { Component } from '@angular/core';

import { Item } from './item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'template-expression-operators';
  item: Item = {
    name: 'Telephone',
    manufactureDate: new Date(),
    price: 80,
    color: null,
  };
  nullItem: Item = null;
}
