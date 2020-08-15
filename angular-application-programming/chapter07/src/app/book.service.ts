import { Injectable } from '@angular/core'
import { Book } from './book'

@Injectable()
export class BookService {
  getBooks(): Book[] {
    return [
      {
        isbn: '978-4-7741-8411-1',
        title: '改訂新版JavaScript本格入門',
        price: 2980,
        publisher: '技術評論社'
      }
    ]
  }
}
