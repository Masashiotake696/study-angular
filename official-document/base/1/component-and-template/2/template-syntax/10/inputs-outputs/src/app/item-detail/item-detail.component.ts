import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {
  @Input() item: string;

  constructor() { }

  ngOnInit(): void {
  }

}
