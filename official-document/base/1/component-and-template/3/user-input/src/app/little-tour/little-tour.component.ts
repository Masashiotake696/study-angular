import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';

@Component({
  selector: 'app-little-tour',
  templateUrl: './little-tour.component.html',
  styleUrls: ['./little-tour.component.css']
})
export class LittleTourComponent implements OnInit {
  heroes: Hero[] = [
    { id: 1, name: 'Windstorm' },
    { id: 2, name: 'Bombasto' },
    { id: 3, name: 'Magneta' },
    { id: 4, name: 'Tornado' },
  ];

  constructor() { }

  ngOnInit(): void {
  }

  addHero(newHero: string): void {
    if (newHero) {
      this.heroes.push({
        id: this.heroes.length + 1,
        name: newHero
      });
    }
  }
}
