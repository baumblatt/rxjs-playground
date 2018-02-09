import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';

import {Console} from './utils/console';
import {Consumer} from './utils/consumer';
import {Producer} from './utils/producer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  /**
   * The debug console.
   */
  console = new Console();

  /**
   * The producer.
   */
  producer = new Producer();

  /**
   * The consumer.
   */
  consumer: Consumer;

  constructor() {
    // create the consumer
    this.consumer = new Consumer('consumer', this.console);
  }

  run() {
    // Clear the output
    this.console.clear();

    /**
     * My Empty Observable factory.
     */
    const myEmpty = () => Observable.create((observer: Observer<any>) => observer.complete());

    /**
     * My Of Observable factory.
     */
    const myOf = (event) => Observable.create((observer: Observer<any>) => {
      observer.next(event);
      observer.complete();
    });

    /**
     * My From Observable factory.
     */
    const myFrom = (events: any[]) => Observable.create((observer: Observer<any>) => {
      events.forEach((event) => observer.next(event));
      observer.complete();
    });

    /**
     * My Interval Observable factory.
     */
    const myInterval = (millis: number) => Observable.create((observer: Observer<any>) => {
      let counter = 0;
      const tearDown = setInterval(() => {
        this.console.println('interval: ' + counter);
        observer.next(counter++);
      }, millis);
      return () => clearInterval(tearDown);
    });

    // Empty observable: [|]
    const empty$ = myEmpty();
    // Of observable: [1|]
    const of$ = myOf(1);
    // From observable: [1234|]
    const from$ = myFrom([1, 2, 3, 4]);
    // Interval observable: [-1-2-3-4-5-6...]
    const interval$ = myInterval(1000);

    // subscribe
    const subscription = interval$.subscribe(this.consumer);
    this.console.println('------------');

    // unsubscribe
    setTimeout(() => subscription.unsubscribe(), 5000);
    this.console.println('------------');
  }
}
