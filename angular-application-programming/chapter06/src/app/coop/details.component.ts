import { Component, Input } from '@angular/core'
import { Book } from '../book'

@Component({
  selector: 'detail-book',
  template: `
    <ul *ngIf="book">
      <li>ISBNコード：{{ book.isbn }}</li>
      <li>書名：{{ book.title }}</li>
      <li>価格：{{ book.price }}</li>
      <li>出版社：{{ book.publisher }}</li>
    </ul>
  `
})
export class DetailsComponent {
  @Input() book: Book
}
