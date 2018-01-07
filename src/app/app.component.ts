import {Component, OnInit} from '@angular/core';

import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/of';

import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';

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
    const myEmpty$ = Observable.create((observer) => {
      observer.complete();
    });

    /**
     * My Of Observable factory.
     */
    const myOf = (event) => Observable.create((observer) => {
      observer.next(event);
      observer.complete();
    });

    /**
     * My Of Observable.
     */
    const myOf$ = myOf(1);

    /**
     * My From Observable factory.
     */
    const myFrom = (events: any[]) => Observable.create((observer) => {
      events.forEach((event) => observer.next(event));
      observer.complete();
    });

    /**
     * My From Observable factory.
     */
    const myFrom$ = myFrom([1, 2, 3, 4]);

    /**
     * My From Observable factory.
     */
    const myInterval = (millis: number) => Observable.create((observer) => {
      let counter = 1;
      let interval;

      interval = window.setInterval(() => {
        this.println('interval-' + counter);
        observer.next('observer-' + counter++);
      }, millis);

      return () => {
        this.println('cleared');
        window.clearInterval(interval);
      };
    });

    /**
     * My From Observable factory.
     */
    const myInterval$ = myInterval(1000);

    // Empty observable: [|]
    const empty$ = Observable.empty();
    // Of observable: [1|]
    const of$ = Observable.of(1);
    // From observable: [1234|]
    const from$ = Observable.from([1, 2, 3, 4]);
    // Interval observable: [-1-2-3-4-5-6...]
    const interval$ = Observable.interval(1000);

    // subscribe
    const subscription = myInterval$.subscribe(this.observer);

    // unsubscribe
    setTimeout(() => subscription.unsubscribe(), 5000);
  }

  println(string) {
    this.output$.next(this.output$.value + string + '\n');
  }
}
