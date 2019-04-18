import GameObject from './general/GameObject';
import { BallConfig } from '../../app';

/* tslint:disable:variable-name */
export class Ball extends GameObject {
  [key: string]: any;
  private _radius: number = 10;

  constructor(
    config?: Partial<BallConfig>,
  ) {
    super();
    Object.keys(config || {}).forEach((key: keyof BallConfig) => {
      this[`_${key}`] = config[key];
    });
  }

  get radius(): number {
    return this._radius;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
  }

  reset(containerHalfWidth: number, containerHalfHeight: number): void {
    this.resetPosition(containerHalfWidth, containerHalfHeight);
    this.resetDirection();
  }

  resetPosition(containerHalfWidth: number, containerHalfHeight: number): void {
    this.x = containerHalfWidth;
    this.y = containerHalfHeight;
  }

  resetDirection(): void {
    this.reverseVxDirection();
    this.reverseVyDirection();
  }

  reverseVxDirection = () => {
    this.vx *= -1;
  }

  reverseVyDirection = () => {
    this.vy *= -1;
  }

  move = (): void => {
    this.x += this.vx;
    this.y += this.vy;
  }

}
