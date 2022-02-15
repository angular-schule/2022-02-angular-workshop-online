import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../shared/book';
import { BookStoreService } from '../shared/book-store.service';

@Component({
  selector: 'br-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.scss']
})
export class BookCreateComponent implements OnInit {

  bookForm: FormGroup;

  constructor(private bs: BookStoreService, private router: Router, private route: ActivatedRoute) {
    this.bookForm = new FormGroup({
      isbn: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(13)
      ]),
      title: new FormControl('', [
        Validators.required
      ]),
      description: new FormControl(''),
      rating: new FormControl(1, [
        Validators.min(1),
        Validators.max(5),
      ]),
      price: new FormControl(0, Validators.min(0)),
    });
  }

  ngOnInit(): void {
  }

  submitForm() {
    if (this.bookForm.invalid) {
      this.bookForm.markAllAsTouched();
      return;
    }

    const book: Book = this.bookForm.value;

    this.bs.create(book).subscribe(b => {
      // this.router.navigate(['/books', b.isbn]);
      this.router.navigate(['..', b.isbn], { relativeTo: this.route });
    });

  }

}


/*
TODO
- Submit-Button
- Abschicken
- HTTP
- Wegnavigieren (Detailseite oder Dashboard)
*/
