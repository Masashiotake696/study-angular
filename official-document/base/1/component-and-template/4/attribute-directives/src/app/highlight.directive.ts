import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  @Input('appHighlight') highlightColor: string;
  @Input() defaultColor: string;

  @HostListener('mouseenter') onMouseEnter(): void {
    this.highlight(this.highlightColor || this.defaultColor || 'red');
  }

  @HostListener('mouseleave') onMouseLeave(): void {
    this.highlight(null);
  }

  constructor(private element: ElementRef) {}

  private highlight(color: string): void {
    this.element.nativeElement.style.backgroundColor = color;
  }
}
