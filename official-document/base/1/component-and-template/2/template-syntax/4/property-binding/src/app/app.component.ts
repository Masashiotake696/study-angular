import { Component } from '@angular/core';

import { Item } from './item';
import { ITEMS } from './mock-items';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  imageUrl = 'https://angular.jp/assets/images/logos/angular/logo-nav@2x.png';
  isUnchanged = true;
  classes = 'color-blue';
  parentItem = 'lamp';
  currentItems: Item[] = ITEMS;
  evilTitle = 'Template <script>alert("evil never sleeps")</script> Syntax';
}
