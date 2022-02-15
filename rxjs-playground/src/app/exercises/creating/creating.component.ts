import { Component } from '@angular/core';
import { Observable, of, from, timer, interval, ReplaySubject, map, filter, Subscriber } from 'rxjs';

@Component({
  selector: 'rxw-creating',
  templateUrl: './creating.component.html',
})
export class CreatingComponent {

  logStream$ = new ReplaySubject<string | number>();

  constructor() {
    /**
     * 1. Erstelle ein Observable und abonniere den Datenstrom.
     *    Probiere dazu die verschiedenen Creation Functions aus: of(), from(), timer(), interval()
     * 2. Implementiere außerdem ein Observable manuell, indem du den Konstruktor "new Observable()" nutzt.
     *
     * Tipps:
     * Zum Abonnieren kannst du einen (partiellen) Observer oder ein einzelnes next-Callback verwenden.
     * Du kannst die Methode this.log() verwenden, um eine Ausgabe in der schwarzen Box im Browser zu erzeugen.
     */

    /******************************/

    // of(1,2,3)
    // from(['A', 'B', 'C'])
    // interval(1000)
    // timer(2000)

    timer(0, 1000).pipe(
      map(e => e * 3),
      filter(e => e % 2 === 0)
    ).subscribe({
      next: e => this.log(e),
      complete: () => this.log('COMPLETE')
    });


    /******************************/

    function producer(o: Subscriber<any>) {
      o.next(1);
      o.next(2);
      o.next(3);
      o.complete();

      setTimeout(() => o.next(5), 2000);
      setTimeout(() => o.error('FEHLER!'), 4000);
    }

    const obs = {
      next: (e: any) => console.log(e),
      error: (err: any) => console.error(err),
      // complete: () => console.log('C')
    }

    // producer(obs);

    const myObs$ = new Observable(producer);
    // myObs$.subscribe(obs);


    /******************************/
  }

  private log(msg: string | number) {
    this.logStream$.next(msg);
  }

}
