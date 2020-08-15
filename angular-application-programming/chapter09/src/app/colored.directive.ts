import { Directive, ElementRef, Input, OnInit, HostListener } from '@angular/core'

@Directive({
  selector: '[myColored]'
})
export class ColoredDirective implements OnInit {
  // @Input() myBgcolor = '#cff'
  @Input('myColored') color = '#cff'

  constructor(private element: ElementRef) {}

  ngOnInit() {
    // this.element.nativeElement.style.backgroundColor = this.myBgcolor
    // this.element.nativeElement.style.backgroundColor = this.color
  }

  @HostListener('mouseenter', ['$event.target']) onmouseenter(span: any) {
    console.log(span)
    this.element.nativeElement.style.backgroundColor = this.color
  }

  @HostListener('mouseleave') onmouseleave() {
    this.element.nativeElement.style.backgroundColor = ''
  }
}
