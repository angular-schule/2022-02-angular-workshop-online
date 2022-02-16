import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs';
import { Book } from '../shared/book';
import { BookRatingService } from '../shared/book-rating.service';
import { BookStoreService } from '../shared/book-store.service';
import { loadBooks } from '../store/book.actions';
import { selectBooks } from '../store/book.selectors';

@Component({
  selector: 'br-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  books: Book[] = [];

  constructor(private store: Store, private rs: BookRatingService, private bs: BookStoreService) {
    this.store.dispatch(loadBooks());

    this.store.select(selectBooks)
      .subscribe(books => {
        this.books = books;
      });


  }

  doRateUp(book: Book) {
    const ratedBook = this.rs.rateUp(book);
    this.updateList(ratedBook);
  }

  doRateDown(book: Book) {
    const ratedBook = this.rs.rateDown(book);
    this.updateList(ratedBook);
  }

  private updateList(ratedBook: Book) {
    // [1,2,3,4,5].map(e => e * 10); // [10,20,30,40,50]
    // [1,2,3,4,5].filter(e => e % 2 === 0) // [2,4]

    /*this.books.map(b => {
      if (b.isbn === ratedBook.isbn) {
        return ratedBook;
      } else {
        return b;
      }
    })*/

    this.books = this.books
      .map(b => (b.isbn === ratedBook.isbn) ? ratedBook : b);

  }

  trackBook(index: number, book: Book) {
    return book.isbn;
  }

  ngOnInit(): void {
  }

}
