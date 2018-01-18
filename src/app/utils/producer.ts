import {Observable} from 'rxjs/Observable';
import {from} from 'rxjs/observable/from';
import {interval} from 'rxjs/observable/interval';
import {concat, delay, filter, map, pairwise} from 'rxjs/operators';
import {Subject} from 'rxjs/Subject';
import {Subscription} from 'rxjs/Subscription';

/**
 * A producer that produce numbers.
 */
export class Producer {
  /**
   * The tick counter.
   */
  private _tick: number;

  /**
   * Subject.
   */
  private _subject: Subject<number>;

  /**
   * Keep track of the clock subscription.
   */
  private _subscription: Subscription;

  constructor() {
    this._tick = 1;
    this._subject = new Subject<number>();

    this.start();
  }

  /**
   * Start the production of ticks.
   */
  private start() {
    this._subscription = from([0, 1, 1]).pipe(
      delay(3000),
      concat(interval(1000).pipe(
        filter(() => !!this._subject.observers.length),
        map(() => this._tick),
        pairwise(),
        map(ticks => ticks[0] + ticks[1])
      ))
    ).subscribe(tick => {
      this._subject.next(this._tick = tick);
    });
  }

  /**
   * Finish the production of ticks;
   */
  public finish() {
    this._subscription.unsubscribe();
    this._subject.complete();
  }

  /**
   * Return the stream of ticks.
   * @returns {Observable<number>}
   */
  get tick$(): Observable<number> {
    return this._subject.asObservable();
  }
}
