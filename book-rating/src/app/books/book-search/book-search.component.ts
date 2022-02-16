import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, filter, Observable, of, switchMap } from 'rxjs';
import { Book } from '../shared/book';
import { BookStoreService } from '../shared/book-store.service';

@Component({
  selector: 'br-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnInit {

  searchControl = new FormControl('');

  results$: Observable<Book[]>;

  constructor(private bs: BookStoreService) {
    const input$: Observable<string> = this.searchControl.valueChanges;

    this.results$ = input$.pipe(
      debounceTime(200),
      filter(e => e.length >= 3 || e.length === 0),
      switchMap(term => {
        if (term.length === 0) {
          return of([]);
        } else {
          return this.bs.search(term);
        }
      })
    );
  }

  ngOnInit(): void {
  }

}
