import {Component} from '@angular/core';
import {empty} from 'rxjs/observable/empty';

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

    // an empty observable
    const observable$ = empty();

    // subscribe
    const subscription = observable$.subscribe(this.consumer);

    // unsubscribe
    setTimeout(() => subscription.unsubscribe(), 5000);
  }
}
