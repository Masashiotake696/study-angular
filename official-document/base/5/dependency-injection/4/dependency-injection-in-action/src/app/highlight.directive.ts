import { Directive, Input, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  @Input('appHighlight') highlightColor: string;

  private element: HTMLElement;

  constructor(element: ElementRef) {
    this.element = element.nativeElement;
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.highlight(this.highlightColor || 'cyan');
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.highlight(null);
  }

  private highlight(color: string): void {
    this.element.style.backgroundColor = color;
  }
}
