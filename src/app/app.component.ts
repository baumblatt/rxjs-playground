import {Component} from '@angular/core';

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
    this.consumer = new Consumer('consumer 1', this.console);
    setTimeout(() => this.producer.finish(), 15000);
  }

  run() {
    // Clear the output
    this.console.clear();

    /**
     * a) Encapsulate the ticking logic with interval inside producer using Subject.
     * b) Subscribe your producer with two consumers concurrently.
     */
    const subscription1 = this.producer.tick$.subscribe(this.consumer);
    const subscription2 = this.producer.tick$.subscribe(new Consumer('consumer 2', this.console));

    // unsubscribe
    setTimeout(() => subscription1.unsubscribe(), 4000);
    setTimeout(() => subscription2.unsubscribe(), 6000);
  }
}
