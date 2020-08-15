import { Directive, Input, OnChanges, TemplateRef, ViewContainerRef } from '@angular/core'

@Directive({
  selector: '[myDeadline]'
})
export class DeadlineDirective implements OnChanges {
  @Input('myDeadline') deadline: Date

  constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef) {}

  ngOnChanges() {
    if (this.deadline.getTime() < (new Date()).getTime()) {
      this.viewContainer.clear()
    } else {
      this.viewContainer.createEmbeddedView(this.templateRef)
    }
  }
}
