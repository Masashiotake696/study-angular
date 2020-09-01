import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input-output',
  templateUrl: './input-output.component.html',
  styleUrls: ['./input-output.component.css']
})
export class InputOutputComponent implements OnInit {
  @Input() item: string;
  @Output() deleteRequest = new EventEmitter<string>();

  lineThrough = '';

  constructor() { }

  ngOnInit(): void {
  }

  delete(): void {
    console.log(`Delete item: ${this.item}`);
    this.deleteRequest.emit(this.item);
    this.lineThrough = 'line-through';
  }
}
