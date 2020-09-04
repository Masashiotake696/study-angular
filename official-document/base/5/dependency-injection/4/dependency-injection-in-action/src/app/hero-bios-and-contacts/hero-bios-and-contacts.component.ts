import { Component } from '@angular/core';

import { HeroService } from '../hero.service';
import { LoggerService } from '../logger.service';

@Component({
  selector: 'app-hero-bios-and-contacts',
  templateUrl: './hero-bios-and-contacts.component.html',
  styleUrls: ['./hero-bios-and-contacts.component.css'],
  providers: [
    HeroService,
  ]
})
export class HeroBiosAndContactsComponent {

  constructor(logger: LoggerService) {
    logger.logInfo('Creating HeroBiosAndContactsComponent');
  }

}
