import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

import { Item } from '../item';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {
  @Input() item: Item;
  @Input() prefix = '';
  @Output() deleteRequest = new EventEmitter<Item>();

  itemImageUrl = 'https://angular.jp/assets/images/logos/angular/logo-nav@2x.png';
  lineThrough = '';
  displayNone = '';

  constructor() { }

  ngOnInit(): void {
  }

  delete(): void {
    this.deleteRequest.emit(this.item);
    this.displayNone = this.displayNone ? '' : 'none';
    this.lineThrough = this.lineThrough ? '' : 'line-through';
  }
}
