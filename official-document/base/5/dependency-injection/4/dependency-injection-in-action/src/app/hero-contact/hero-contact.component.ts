import { Component, Host, Optional } from '@angular/core';

import { HeroCacheService } from '../hero-cache.service';
import { LoggerService } from '../logger.service';

@Component({
  selector: 'app-hero-contact',
  templateUrl: './hero-contact.component.html',
  styleUrls: ['./hero-contact.component.css']
})
export class HeroContactComponent {
  hasLogger = false;

  constructor(
    @Host() // limit to the host component's instance of the HeroCacheService
    private heroCache: HeroCacheService,
    @Host() // limit search for logger; hides the application-wide logger
    @Optional() // ok if the logger doesn't exist
    private loggerService?: LoggerService,
  ) {
    if (loggerService) {
      this.hasLogger = true;
      loggerService.logInfo('HeroContactComponent can log!');
    }
  }

  get phoneNumber(): string {
    return this.heroCache.hero.phone;
  }
}
