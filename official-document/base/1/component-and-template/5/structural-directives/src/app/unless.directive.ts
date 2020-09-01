import { Directive, TemplateRef, ViewContainerRef, Input } from '@angular/core';

@Directive({
  selector: '[appUnless]'
})
export class UnlessDirective {
  private hasView = false;

  // 条件の値が変わるたびにappUnlessプロパティをセットするため、セッターが必要
  // セッターの引数にinput要素が割り当てられる
  @Input() set appUnless(condition: boolean) {
    if (!condition && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (condition && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }

  constructor(
    private templateRef: TemplateRef<any>,　// TemplateRefで<ng-template>の内容を取得
    private viewContainer: ViewContainerRef, // ViewContainerRefを通してビューにアクセス
  ) { }

}
