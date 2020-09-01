import { Injectable } from '@angular/core';

import { QuestionBase } from './question-base';
import { QuestionDropdown } from './question-dropdown';
import { QuestionTextbox } from './question-textbox';
import { Observable, of } from 'rxjs';

@Injectable()
export class QuestionService {
  // TODO: get from a remote source of question metadata
  getQuestions(): Observable<QuestionBase<string>[]> {
    const questions: QuestionBase<string>[] = [
      new QuestionDropdown({
        key: 'brave',
        label: 'Bravery Rating',
        options: [
          { key: 'solid', value: 'Solid' },
          { key: 'great', value: 'Great' },
          { key: 'good', value: 'Good' },
          { key: 'unproven', value: 'Unproven' },
        ],
        order: 3,
      }),
      new QuestionTextbox({
        key: 'firstName',
        label: 'First name',
        value: 'Bombasto',
        required: true,
        order: 1,
      }),
      new QuestionTextbox({
        key: 'emailAddress',
        label: 'Email',
        type: 'email',
        order: 2,
      })
    ];

    return of(questions.sort((a, b) => a.order - b.order));
  }
}
