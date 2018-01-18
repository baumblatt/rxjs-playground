/**
 * A producer that produce numbers.
 */
export class Producer {
  /**
   * The tick counter.
   */
  private _tick: number;

  constructor() {
    this._tick = 0;
  }

  /**
   * Returns the next tick.
   * @returns {number} the next tick.
   */
  get tick(): number {
    return this._tick++;
  }
}
