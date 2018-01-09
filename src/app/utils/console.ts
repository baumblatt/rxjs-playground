import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';

/**
 * A place to expose some debug messages.
 */
export class Console {
  /**
   * Internal memory.
   */
  private _memory: BehaviorSubject<String>;

  constructor() {
    // initialize the memory
    this._memory = new BehaviorSubject<String>('');
  }

  /**
   * Retrieve the internal memory as observable.
   * @returns {Observable<String>}
   */
  get memory(): Observable<String> {
    return this._memory.asObservable();
  }

  /**
   * Clear the console.
   */
  clear() {
    this._memory.next('');
  }

  /**
   * Append to console.
   * @param string some text.
   */
  println(string) {
    this._memory.next(this._memory.value + string + '\n');
  }
}
