import { Directive, Output, EventEmitter, ElementRef } from '@angular/core';

@Directive({
  selector: '[appMyClick]'
})
export class ClickDirective {
  @Output('appMyClick') clicks = new EventEmitter<string>();

  toggle = false;

  constructor(element: ElementRef) {
    element.nativeElement.addEventListener('click', (event: Event) => {
      this.toggle = !this.toggle;
      this.clicks.emit(this.toggle ? 'Click!' : '');
    });
  }

}
