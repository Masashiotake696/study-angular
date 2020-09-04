import { Component } from '@angular/core';

import { FlowerService } from '../flower.service';
import { AnimalService } from '../animal.service';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css'],
  // Provide services
  providers: [
    { provide: FlowerService, useValue: { emoji: '🌻' } },
  ],
  viewProviders: [
    { provide: AnimalService, useValue: { emoji: '🐶' } },
  ],
})
export class ChildComponent {

  constructor(public flowerService: FlowerService, public animalService: AnimalService) { }

}
