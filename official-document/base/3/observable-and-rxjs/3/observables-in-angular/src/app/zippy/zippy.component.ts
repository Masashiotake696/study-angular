import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-zippy',
  templateUrl: './zippy.component.html',
  styleUrls: ['./zippy.component.css']
})
export class ZippyComponent {
  visible = true;
  @Output() isOpen = new EventEmitter();
  @Output() isClose = new EventEmitter();

  toggle(): void {
    this.visible = !this.visible;
    // emit()を呼び出すとサブスクライブされたオブザーバーのnext()メソッドに送出された値が渡される
    if (this.visible) {
      this.isOpen.emit();
    } else {
      this.isClose.emit();
    }
  }
}
