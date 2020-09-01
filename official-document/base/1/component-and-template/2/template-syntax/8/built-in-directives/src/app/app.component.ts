import { Component, OnInit } from '@angular/core';

import { Item } from './item';
import { Customer } from './customer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isFontLarge = true;
  isColorRed = true;
  isBackgroundColorGreen = true;
  currentClasses = {};

  fontSize = true;
  currentStyles = {};

  currentItem: Item = {
    id: 1,
    name: 'item1'
  };
  currentItem2: Item = {
    id: 2,
    name: 'item2'
  };
  currentItem3: Item = {
    id: 3,
    name: 'item3'
  };
  currentItem4: Item = {
    id: 4,
    name: 'item4'
  };

  isActive = true;
  item: Item = {
    id: 1,
    name: 'item'
  };
  hide = true;
  currentCustomer: Customer = {
    name: 'taro'
  };
  nullCustomer = null;

  items: Item[] = [
    { id: 1, name: 'item1' },
    { id: 2, name: 'item2' },
    { id: 3, name: 'item3' },
  ];

  switchItem: Item = {
    id: 1,
    name: 'item1',
    feature: 'stout'
  };

  ngOnInit(): void {
    this.setCurrentClasses();
    this.setCurrentStyles();
  }

  setCurrentClasses(): void {
    this.currentClasses = {
      'font-large': this.isFontLarge,
      'color-red': this.isColorRed,
      'background-color-green': this.isBackgroundColorGreen,
    };
  }

  toggleFontSize(): void {
    this.fontSize = !this.fontSize;
  }

  setCurrentStyles(): void {
    this.currentStyles = {
      'font-size': this.isFontLarge ? '2em' : 'normal',
      color: this.isColorRed ? 'red' : 'black',
      'background-color': this.isBackgroundColorGreen ? 'green' : 'white',
    };
  }

  setUppercaseName(event: string): void {
    this.currentItem4.name = event.toUpperCase();
  }

  trackByItems(index: number, item: Item): number {
    return item.id;
  }

  changeItemIds(): void {
    this.items = [
      { id: 1, name: 'change item1' },
      { id: 2, name: 'item2' },
      { id: 3, name: 'item3' },
      { id: 4, name: 'item4' },
    ];
  }
}
