import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { QuestionBase } from './question-base';
import { QuestionService } from './question.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    QuestionService,
  ]
})
export class AppComponent {
  questions$: Observable<QuestionBase<string>[]>;

  constructor(private questionService: QuestionService) {
    this.questions$ = this.questionService.getQuestions();
  }
}
