import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

import { Hero } from '../hero';
import { forbiddenNameValidator } from '../forbidden-name.directive';
import { identityRevealedValidator } from '../identity-revealed.directive';
import { UniqueAlterEgoValidator } from '../unique-alter-ego.directive';

@Component({
  selector: 'app-hero-form-reactive',
  templateUrl: './hero-form-reactive.component.html',
  styleUrls: ['./hero-form-reactive.component.css']
})
export class HeroFormReactiveComponent implements OnInit {
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

  heroForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private uniqueAlterEgoValidator: UniqueAlterEgoValidator,
  ) { }

  ngOnInit(): void {
    this.heroForm = this.formBuilder.group(
      {
        name: [
          this.hero.name,
          [
            Validators.required,
            Validators.minLength(4),
            forbiddenNameValidator(/bob/i),
          ]
        ],
        alterEgo: [
          this.hero.alterEgo,
          { asyncValidators: this.uniqueAlterEgoValidator.validate.bind(this.uniqueAlterEgoValidator), updateOn: 'blur' },
        ],
        power: [this.hero.power, Validators.required]
      },
      {
        validators: identityRevealedValidator()
      }
    );
  }

  get name(): FormControl {
    return this.heroForm.get('name') as FormControl;
  }

  get alterEgo(): FormControl {
    return this.heroForm.get('alterEgo') as FormControl;
  }

  get power(): FormControl {
    return this.heroForm.get('power') as FormControl;
  }
}
