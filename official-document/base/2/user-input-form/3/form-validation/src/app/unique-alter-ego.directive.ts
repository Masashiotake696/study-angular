import { Directive, Injectable, forwardRef } from '@angular/core';
import { AsyncValidator, AbstractControl, ValidationErrors, NG_ASYNC_VALIDATORS } from '@angular/forms';

import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { HeroesService } from './heroes.service';

@Injectable({
  providedIn: 'root'
})
export class UniqueAlterEgoValidator implements AsyncValidator {
  constructor(private heroesService: HeroesService) {}

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.heroesService.isAlterEgoTaken(control.value).pipe(
      map(isTaken => (isTaken ? { uniqueAlterEgo: true } : null)),
      catchError(() => of(null))
    );
  }
}

@Directive({
  selector: '[appUniqueAlterEgo]',
  providers: [
    { provide: NG_ASYNC_VALIDATORS, useExisting: UniqueAlterEgoDirective, multi: true }
  ]
})
export class UniqueAlterEgoDirective implements AsyncValidator {
  constructor(private uniqueAlterEgoValidator: UniqueAlterEgoValidator) { }

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.uniqueAlterEgoValidator.validate(control);
  }
}
