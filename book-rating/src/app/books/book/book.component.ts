import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Book } from '../shared/book';

@Component({
  selector: 'br-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookComponent implements OnInit {

  @Input() book?: Book;
  @Output() rateUp = new EventEmitter<Book>();
  @Output() rateDown = new EventEmitter<Book>();

  constructor() {
    console.log('BC');
  }

  ngOnInit(): void {
  }

  doRateUp() {
    this.book && this.rateUp.emit(this.book);
  }

  doRateDown() {
    this.book && this.rateDown.emit(this.book);
  }

  log() {
    console.log('CD', Date.now());
  }
}
