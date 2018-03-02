import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {interval} from 'rxjs/observable/interval';

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
     * a) Encapsulate the ticking logic with interval inside producer using Subject.
     * b) Subscribe your producer with two consumers concurrently.
     */
    const observable$ = Observable.create((observer) => {
      // hot answer
      const hotProducer = this.producer;

      // the ticker observable
      const inner = interval(1000);

      return inner.subscribe(() => observer.next(hotProducer.tick));
    });

    // subscribe
    const subscription = observable$.subscribe(this.consumer);

    // unsubscribe
    setTimeout(() => subscription.unsubscribe(), 5000);
  }
}
