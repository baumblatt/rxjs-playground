import {Console} from './console';

/**
 * An observer that print the events on console.
 */
export class Consumer {
  /**
   * The console.
   */
  console: Console;

  /**
   * Prefix.
   */
  private _prefix: string;

  constructor(prefix: string, console: Console) {
    // keep the prefix
    this._prefix = prefix + ': ';
    // keep the console
    this.console = console;
  }

  /**
   * Print the next event on console.
   * @param next The next event.
   */
  next(next: any) {
    this.console.println(this._prefix + next);
  }

  /**
   * Print the error on console.
   * @param error The error
   */
  error(error: any) {
    this.console.println(this._prefix + error);
  }

  /**
   * Print the complete signal on console.
   */
  complete() {
    this.console.println(this._prefix + 'complete');
  }
}
