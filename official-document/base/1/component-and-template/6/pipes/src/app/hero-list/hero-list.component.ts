import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hero-list',
  template: `
    <h2>Heroes from JSON File</h2>

    <div *ngFor="let hero of ('assets/heroes.json' | fetchJson)">
      {{ hero.name }}
    </div>

    <p>
      Heroes as JSON:
      {{ 'assets/heroes.json' | fetchJson | json }}
    </p>
  `
})
export class HeroListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
