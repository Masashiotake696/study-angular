import { Component } from '@angular/core';

import { FlowerService } from './flower.service';
import { LeafService } from './leaf.service';
import { AnimalService } from './animal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name = 'Angular';

  showCars = true;
  showHeroes = true;
  showVillains = true;

  constructor(
    public flowerService: FlowerService,
    public leafService: LeafService,
    public animalService: AnimalService,
  ) { }
}
