import { Component, Input } from '@angular/core';

import { Hero } from '../hero';

@Component({
  selector: 'app-hello-child',
  template: `
    <h3>{{ hero.name }}</h3>
    <p>I, {{ hero.name }}, am at your service, {{ masterName }}</p>
  `
})
export class HelloChildComponent {
  @Input() hero: Hero;
  @Input('master') masterName: string; // tslint:disable-line:no-input-rename
}
