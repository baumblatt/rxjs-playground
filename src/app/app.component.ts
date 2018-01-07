import {Component, OnInit} from '@angular/core';

import {BehaviorSubject} from 'rxjs/BehaviorSubject';

import {empty} from 'rxjs/observable/empty';
import {from} from 'rxjs/observable/from';
import {interval} from 'rxjs/observable/interval';
import {of} from 'rxjs/observable/of';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  /**
   * The output like console.log.
   */
  output$ = new BehaviorSubject<String>('');

  /**
   * A simple observer that output events, error and complete.
   */
  observer: any;

  constructor() {
    // the simple observer implementation
    this.observer = {
      next: next => this.println(next),
      error: error => this.println(error),
      complete: () => this.println('complete')
    };
  }

  ngOnInit() {
    // this.run();
  }

  run() {
    // Clear the output
    this.output$.next('');

    /**
     * My Empty Observable.
     */
    // const myEmpty$ =

    /**
     * My Of Observable.
     */
    //  const myOf$ =

    /**
     * My From Observable.
     */
    // const myFrom$ =

    /**
     * My Interval Observable.
     */
    // const myInterval$ =

    // Empty observable: [|]
    const empty$ = empty();
    // Of observable: [1|]
    const of$ = of(1);
    // From observable: [1234|]
    const from$ = from([1, 2, 3, 4]);
    // Interval observable: [-1-2-3-4-5-6...]
    const interval$ = interval(1000);

    // subscribe
    const subscription = empty$.subscribe(this.observer);

    // unsubscribe
    // setTimeout(() => subscription.unsubscribe(), 5000);
  }

  println(string) {
    this.output$.next(this.output$.value + string + '\n');
  }
}
