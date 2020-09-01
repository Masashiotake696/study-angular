import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-item-output',
  templateUrl: './item-output.component.html',
  styleUrls: ['./item-output.component.css']
})
export class ItemOutputComponent implements OnInit {
  @Output() newItemEvent = new EventEmitter<string>();

  item: string;

  constructor() { }

  ngOnInit(): void {
  }

  addNewItem(value: string): void {
    this.newItemEvent.emit(value);
    this.item = '';
  }
}
