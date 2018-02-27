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
     * Clone the rjxs/observable/empty with your own code.
     * Marble Diagram: |
     */
    const myEmpty = () => Observable.create((observer: Observer<any>) => observer.complete());

    /**
     * Clone the rjxs/observable/of with your own code.
     * Marble Diagram: [1|]
     */
    const myOf = (event: any) => Observable.create((observer: Observer<any>) => {
      observer.next(event);
      observer.complete();
    });

    /**
     * Clone the rjxs/observable/from with your own code.
     * Marble Diagram: [1234|]
     */
    const myFrom = (events: any[]) => Observable.create((observer: Observer<any>) => {
      events.forEach((event) => observer.next(event));
      observer.complete();
    });

    /**
     * Clone the rjxs/observable/interval with your own code.
     * Marble Diagram: [-1-2-3-4-5-6...]
     */
    const myInterval = (millis: number) => Observable.create((observer: Observer<number>) => {
      let counter = 0;
      const teardown = setInterval(() => {
        this.console.println('interval: ' + counter);
        observer.next(counter++);
      }, millis);
      return () => clearInterval(teardown);
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
  }
}
