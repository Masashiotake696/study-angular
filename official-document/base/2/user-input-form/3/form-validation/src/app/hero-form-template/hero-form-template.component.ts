import { Component } from '@angular/core';

import { Hero } from '../hero';

@Component({
  selector: 'app-hero-form-template',
  templateUrl: './hero-form-template.component.html',
  styleUrls: ['./hero-form-template.component.css']
})
export class HeroFormTemplateComponent {
  powers: string[] = [
    'Really Smart',
    'Super Flexible',
    'Weather Changer',
  ];

  hero: Hero = {
    name: 'Dr.',
    alterEgo: 'Dr. What',
    power: this.powers[0],
  };
}
