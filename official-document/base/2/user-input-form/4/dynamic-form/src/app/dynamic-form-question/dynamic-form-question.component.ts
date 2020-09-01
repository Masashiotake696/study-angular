import { Component, Input } from '@angular/core';

import { QuestionBase } from '../question-base';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dynamic-form-question',
  templateUrl: './dynamic-form-question.component.html',
  styleUrls: ['./dynamic-form-question.component.css']
})
export class DynamicFormQuestionComponent {
  @Input() question: QuestionBase<string>;
  @Input() formGroup: FormGroup;

  get isValid(): boolean {
    return this.formGroup.controls[this.question.key].valid;
  }
}
