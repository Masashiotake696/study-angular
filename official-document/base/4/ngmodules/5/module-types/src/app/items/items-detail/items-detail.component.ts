import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-items-detail',
  templateUrl: './items-detail.component.html',
  styleUrls: ['./items-detail.component.css']
})
export class ItemsDetailComponent {
  id: number;

  constructor(route: ActivatedRoute) {
    this.id = parseInt(route.snapshot.paramMap.get('id'), 10);
  }

}
