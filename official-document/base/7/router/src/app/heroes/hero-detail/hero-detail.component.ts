import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  hero$: Observable<Hero>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private heroService: HeroService,
  ) { }

  ngOnInit(): void {
    this.hero$ = this.route.paramMap.pipe(
      switchMap(params => this.heroService.getHero(params.get('id')))
    );
  }

  gotoHeroes(hero: Hero): void {
    const heroId = hero ? hero.id : null;

    this.router.navigate(['/superheroes', { id: heroId, foo: 'foo' }]);
  }

}
