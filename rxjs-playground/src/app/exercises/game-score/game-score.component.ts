import { Component } from '@angular/core';
import { Subject, ReplaySubject, scan, reduce, of, map } from 'rxjs';

@Component({
  selector: 'rxw-game-score',
  templateUrl: './game-score.component.html',
})
export class GameScoreComponent {

  logStream$ = new ReplaySubject<string | number>();
  score$ = new Subject<number>();

  currentScore = 0;

  constructor() {
    /**
     * Wir entwickeln ein spannendes Browser-Spiel!
     * Jetzt fehlt nur noch der Code, um den Punktestand zu ermitteln ...
     */

    /******************************/

    this.score$.pipe(
      scan((acc, item) => acc + item, 0)
    ).subscribe(score => this.currentScore = score);

    const state$ = of(
      'SETNAMEFERDINAND',
      'SETNAMESEB',
      'SETCITYLEIPZIG',
      'SETCITYHAMBURG',
      'SETCITYLUEBECK'
    ).pipe(
      scan((acc, msg) => {
        switch (msg) {
          case 'SETNAMEFERDINAND': return { ...acc, name: 'Ferdinand' };
          case 'SETNAMESEB': return { ...acc, name: 'Sebastian' };
          case 'SETCITYHAMBURG': return { ...acc, city: 'Hamburg' };
          case 'SETCITYLEIPZIG': return { ...acc, city: 'Leipzig' };
          case 'SETCITYBERLIN': return { ...acc, city: 'Berlin' };
          default: return acc;
        }
      }, { name: 'Lisa', city: 'Dresden' })
    )


    state$.subscribe(console.log);

    // state$.pipe(map(state => state.city)).subscribe(console.log);


    // [1,2,3,4,5,6].reduce((acc, item) => acc + item);

    /******************************/

    this.score$.subscribe({
      next: e => this.logStream$.next(e),
      complete: () => this.logStream$.next('✅ COMPLETE')
    });
  }

  finishGame() {
    this.score$.complete();
  }

  addScore(amount: number) {
    this.score$.next(amount);
  }

}
