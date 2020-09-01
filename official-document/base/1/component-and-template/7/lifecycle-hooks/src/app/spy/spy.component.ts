import { Component, OnInit } from '@angular/core';

import { LoggerService } from '../logger.service';

@Component({
  selector: 'app-spy',
  templateUrl: './spy.component.html',
  styleUrls: ['./spy.component.css'],
  providers: [
    LoggerService,
  ],
})
export class SpyComponent implements OnInit {
  newName = 'Herbie';
  heroes: string[] = ['Windstorm', 'Magneta'];

  constructor(public logger: LoggerService) { }

  ngOnInit(): void {
  }

  addHero(): void {
    if (this.newName.trim()) {
      this.heroes.push(this.newName.trim());
      this.newName = '';
      this.logger.tick();
    }
  }

  removeHero(hero: string): void {
    this.heroes.splice(this.heroes.indexOf(hero), 1);
    this.logger.tick();
  }

  reset(): void {
    this.logger.log('-- reset --');
    this.heroes = [];
    this.logger.tick();
  }
}
