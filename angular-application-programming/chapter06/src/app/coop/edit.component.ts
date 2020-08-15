import { Component, EventEmitter, Input, Output } from '@angular/core'
import { Book } from '../book'

@Component({
  selector: 'edit-book',
  template: `
    <form #myForm="ngForm" (ngSubmit)="onSubmit()" *ngIf="book">
      <div>
        <label for="isbn">ISBNコード：</label>
        <span id="isbn">{{ book.isbn }}</span>
      </div>
      <div>
        <label for="title">書名：</label>
        <input id="title" name="title" size="25" type="text" [(ngModel)]="book.title" />
      </div>
      <div>
        <label for="price">価格：</label>
        <input id="price" name="price" size="5" type="number" [(ngModel)]="book.price" />
      </div>
      <div>
        <label for="publisher">出版社：</label>
        <input id="publisher" name="publisher" type="text" [(ngModel)]="book.publisher" />
      </div>
      <div>
        <input type="submit" value="編集" />
      </div>
    </form>
  `
})
export class EditComponent {
  @Input() book: Book
  @Output() edited = new EventEmitter<Book>()

  onSubmit() {
    this.edited.emit(this.book)
  }
}
