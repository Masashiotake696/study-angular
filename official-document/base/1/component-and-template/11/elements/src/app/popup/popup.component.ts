import { Component, HostBinding, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
  animations: [
    trigger('state', [
      state('opened', style({
        transform: 'translateY(0%)'
      })),
      state('void, closed', style({
        transform: 'translateY(100%)',
        opacity: 0,
      })),
      transition('* => *', animate('100ms ease-in'))
    ])
  ]
})
export class PopupComponent {
  @HostBinding('@state') state: 'opened' | 'closed' = 'closed';
  @Input()
  get message(): string {
    return this._message;
  }
  set message(message: string) {
    this._message = message;
    this.state = 'opened';
  }
  @Output() closed = new EventEmitter();

  private _message: string; // tslint:disable-line:variable-name
}
