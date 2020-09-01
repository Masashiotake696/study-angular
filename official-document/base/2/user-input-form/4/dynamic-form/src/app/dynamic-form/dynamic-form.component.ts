import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { QuestionBase } from '../question-base';
import { QuestionControlService } from '../question-control.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css'],
  providers: [
    QuestionControlService,
  ]
})
export class DynamicFormComponent implements OnInit {
  @Input() questions: QuestionBase<string>[] = [];

  formGroup: FormGroup;
  payLoad = '';

  constructor(private questionControlService: QuestionControlService) { }

  ngOnInit(): void {
    this.formGroup = this.questionControlService.toFormGroup(this.questions);
  }

  onSubmit(): void {
    this.payLoad = JSON.stringify(this.formGroup.getRawValue());
  }

}
