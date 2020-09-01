import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('bindingInput') bindingInput: ElementRef;

  isUnchanged = true;

  // bindingInputのvalue属性の値をコンソールに出力
  // ※ value属性は初期値を表すため、テキストボックスを変更しても変わらない
  getHTMLAttributeValue(): any {
    console.warn('HTML attribute value: ' + this.bindingInput.nativeElement.getAttribute('value'));
  }

  // bindingInputのvalueプロパティの値をコンソールに出力
  // ※ valueプロパティは現在の値を表すため、テキストボックスの変更が反映される
  getDOMPropertyValue(): any {
    console.warn('DOM property value: ' + this.bindingInput.nativeElement.value);
  }

  working(): any {
    console.warn('Test Button works!');
  }

  // id="testButton"のボタンのdisabledプロパティを切り替える
  toggleDisabled(): any {
    const testButton = document.getElementById('testButton') as HTMLInputElement;
    testButton.disabled = !testButton.disabled;
    console.warn(testButton.disabled);
  }
}
