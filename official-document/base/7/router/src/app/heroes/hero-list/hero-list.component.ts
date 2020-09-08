import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.css']
})
export class HeroListComponent implements OnInit {
  heroes$: Observable<Hero[]>;
  selectedId: number;

  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.heroes$ = this.route.paramMap.pipe(
      switchMap(params => {
        this.selectedId = +params.get('id');
        return this.heroService.getHeroes();
      })
    );
  }

}
