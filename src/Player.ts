import {
  Paddle
} from './Paddle';

export class Player {
  private _score: number;
  private paddle = new Paddle(
    this.paddleConfig,
    );

  constructor(
    private _name: string = 'Player',
    private paddleConfig?: PaddleConfig,
    ) { }

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

  getPaddleConfig(): PaddleConfig {
    return {
      color: this.paddle.color,
      width: this.paddle.width,
      height: this.paddle.height,
      x: this.paddle.x,
      y: this.paddle.y,
    }
  }
}