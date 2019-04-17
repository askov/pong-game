import GameObject from './general/GameObject';

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

  move = (): void => {
    this._x += this._vx;
    this._y += this._vy;
  }

  reverseVyDirection = () => {
    this._vy *= -1;
  }

  reverseVxDirection = () => {
    this._vx *= -1;
  }
  draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
  }

  resetPositionToContainerCenter(containerHalfWidth: number, containerHalfHeight: number): void {
    this._x = containerHalfWidth;
    this._y = containerHalfHeight;
  }

  resetDirection(): void {
    this.reverseVxDirection();
    this.reverseVyDirection();
  }

  resetBall(containerHalfWidth: number, containerHalfHeight: number): void {
    this.resetPositionToContainerCenter(containerHalfWidth, containerHalfHeight);
    this.resetDirection();
  }
}
