import { Directive, Input } from '@angular/core';
import { Validator, AbstractControl, ValidationErrors, ValidatorFn, NG_VALIDATORS } from '@angular/forms';

export function forbiddenNameValidator(nameRegExp: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = nameRegExp.test(control.value);
    return forbidden ? { forbiddenName: { value: control.value } } : null;
  };
}

@Directive({
  selector: '[appForbiddenName]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: ForbiddenNameDirective, multi: true }
  ]
})
export class ForbiddenNameDirective implements Validator {
  @Input('appForbiddenName') forbiddenName: string;

  validate(control: AbstractControl): ValidationErrors | null {
    return this.forbiddenName ? forbiddenNameValidator(new RegExp(this.forbiddenName, 'i'))(control) : null;
  }
}
