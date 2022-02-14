import { Component, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Book } from '../shared/book';
import { BookRatingService } from '../shared/book-rating.service';

import { DashboardComponent } from './dashboard.component';


/*@Component({ selector: 'br-book', template: '' })
class DummyComponent {
  @Input() book?: Book;
}*/

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let book: Book;

  beforeEach(async () => {
    const ratingMock: Partial<BookRatingService> = {
      rateUp: (b: Book) => b,
      rateDown: (b: Book) => b,
    };

    book = { isbn: '12345' } as Book;

    await TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      providers: [
        // BRS ersetzen: immer wenn jemand BRS anfordert, wird stattdessen ratingMock ausgeliefert
        {
          provide: BookRatingService,
          useValue: ratingMock
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the service for doRateUp()', () => {
    // Arrange
    const service = TestBed.inject(BookRatingService); // das ist eigentlich der ratingMock!
    spyOn(service, 'rateUp').and.callThrough();

    // Act
    component.doRateUp(book);

    // Assert
    expect(service.rateUp).toHaveBeenCalledOnceWith(book);
  });
});
