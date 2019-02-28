import {
  Paddle
} from './Paddle';

export class Player {
  private _score: number;
  private _paddle = new Paddle();

  constructor(
    private _name: string = 'Player',
    ) {
  }

  get name(): string {
    return this._name;
  }

  get score(): number {
    return this._score;
  }

  incrementScore(): void {
    this._score += 1;
  }

  decrementScore(): void {
    if (this._score > 0) {
      this._score -= 1;
    }
  }
}