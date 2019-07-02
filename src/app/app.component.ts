import {Component} from '@angular/core';

import {empty, from, interval, of} from 'rxjs';

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
    // const myEmpty =

    /**
     * Clone the rjxs/observable/of with your own code.
     * Marble Diagram: [1|]
     */
    //  const myOf =

    /**
     * Clone the rjxs/observable/from with your own code.
     * Marble Diagram: [1234|]
     */
    // const myFrom =

    /**
     * Clone the rjxs/observable/interval with your own code.
     * Marble Diagram: [-1-2-3-4-5-6...]
     */
      // const myInterval =

      // Empty observable: [|]
    const empty$ = empty();
    // Of observable: [1|]
    const of$ = of(1);
    // From observable: [1234|]
    const from$ = from([1, 2, 3, 4]);
    // Interval observable: [-1-2-3-4-5-6...]
    const interval$ = interval(1000);

    // subscribe
    const subscription = empty$.subscribe(this.consumer);

    // unsubscribe
    // setTimeout(() => subscription.unsubscribe(), 5000);
  }
}
