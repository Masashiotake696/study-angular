import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors, ValidatorFn, FormGroup } from '@angular/forms';

export function identityRevealedValidator(): ValidatorFn {
  return (control: FormGroup): ValidationErrors | null => {
    const name = control.get('name');
    const alterEgo = control.get('alterEgo');
    return (name && alterEgo && name.value === alterEgo.value) ? { identityRevealed: true } : null;
  };
}

@Directive({
  selector: '[appIdentityRevealed]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: IdentityRevealedDirective, multi: true }
  ]
})
export class IdentityRevealedDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    return identityRevealedValidator()(control);
  }
}
