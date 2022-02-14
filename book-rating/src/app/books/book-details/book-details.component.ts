import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../shared/book';

@Component({
  selector: 'br-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute) {
    // Synchroner Weg / PULL
    // const isbn = this.route.snapshot.paramMap.get('isbn'); // path: 'books/:isbn'

    // Asynchroner Weg / PUSH
    this.route.paramMap.subscribe(params => {
      const isbn = params.get('isbn')!; // Non-Null Assertion
      console.log(isbn);
    });

    // Aufgabe:
    // Buch über HTTP abrufen
    // Buch anzeigen (ganz simpel!)
  }

  ngOnInit(): void {
  }

}
