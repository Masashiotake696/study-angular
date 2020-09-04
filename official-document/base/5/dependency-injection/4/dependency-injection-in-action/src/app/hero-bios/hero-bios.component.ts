import { Component } from '@angular/core';

import { LoggerService } from '../logger.service';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-bios',
  templateUrl: './hero-bios.component.html',
  styleUrls: ['./hero-bios.component.css'],
  providers: [
    HeroService,
  ]
})
export class HeroBiosComponent {

  constructor(logger: LoggerService) {
    logger.logInfo('Creating HeroBiosComponent');
  }

}
