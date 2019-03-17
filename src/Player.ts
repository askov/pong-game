import {
  Paddle
} from './Paddle';

import { PaddlePosition} from "./Config";

export class Player {
  private _score: number = 0;
  private paddle = new Paddle(
    this.paddleConfig,
    );

  constructor(
    private _name: string = 'Player',
    private paddleConfig?: PaddleConfig,
    private _paddlePosition = PaddlePosition.Left,

  ) { }

  get name(): string {
    return this._name;
  }

  get score(): number {
    return this._score;
  }

  get paddlePosition(): PaddlePosition {
    return this._paddlePosition;
  }

  incrementScore(): void {
    this._score += 1;
  }

  movePaddle(y: number) {
    this.paddle.y = y;
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

  reset(): void {
    this._score = 0;
  }
}
