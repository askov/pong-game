/* tslint:disable:variable-name */
import {
  Paddle,
} from './Paddle';
import { PaddleConfig } from '../../app';

export class Player {
  private _score: number = 0;
  private paddle = new Paddle(
    this.paddleConfig,
  );

  constructor(
    private _name: string = 'Player',
    private paddleConfig?: PaddleConfig,
  ) {
  }

  get name(): string {
    return this._name;
  }

  get score(): number {
    return this._score;
  }

  reset(): void {
    this._score = 0;
  }

  isWinner(maxScore: number): boolean {
    return this.score === maxScore;
  }

  incrementScore(): void {
    this._score += 1;
  }

  movePaddle(y: number, height: number) {
    this.paddle.y = y;
    this.paddle.setPaddleCenterToY(y, height);
  }

  drawPaddle(ctx: CanvasRenderingContext2D) {
    this.paddle.draw(ctx);
  }

  getPaddleConfig(): PaddleConfig {
    return {
      color: this.paddle.color,
      width: this.paddle.width,
      height: this.paddle.height,
      x: this.paddle.x,
      y: this.paddle.y,
    };
  }

}
