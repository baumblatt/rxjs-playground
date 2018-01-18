import {Observable} from 'rxjs/Observable';
import {interval} from 'rxjs/observable/interval';
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
    this._tick = 0;
    this._subject = new Subject<number>();

    this.start();
  }

  /**
   * Start the production of ticks.
   */
  private start() {
    this._subscription = interval(1000)
      .subscribe(() => {
        if (this._subject.observers.length) {
          this._subject.next(++this._tick);
        }
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
