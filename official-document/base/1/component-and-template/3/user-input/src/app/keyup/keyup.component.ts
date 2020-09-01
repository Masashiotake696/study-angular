import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-keyup',
  templateUrl: './keyup.component.html',
  styleUrls: ['./keyup.component.css']
})
export class KeyupComponent implements OnInit {
  values = '';
  values2 = '';
  value = '';
  value2 = '';

  constructor() { }

  ngOnInit(): void {
  }

  onKeyUp(event: KeyboardEvent): void {
    this.values += (event.target as HTMLInputElement).value + ' | ';
  }

  onKeyUp2(value: string): void {
    this.values2 += value + ' | ';
  }

  onEnter(value: string): void {
    this.value = value;
  }

  update(value: string): void {
    this.value2 = value;
  }
}
