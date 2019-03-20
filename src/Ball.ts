export class Ball {
  constructor(
    private _color: string = 'gray',
    private _radius: number = 10,
    private _x: number = 0,
    private _y: number = 0,
    private _vx: number = 5,
    private _vy: number = 5,
    ) {
  }

  get color(): string {
    return this._color;
  }

  get x(): number {
    return this._x;
  }

  get y(): number {
    return this._y;
  }

  set x(x: number) {
    this._x = x;
  }

  set y(y: number) {
    this._y = y;
  }

  get vx(): number {
    return this._vx;
  }

  get vy(): number {
    return this._vy;
  }

  move = (): void => {
    this._x += this._vx;
    this._y += this._vy;
  }

  get radius(): number {
    return this._radius;
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
    this._x = containerHalfWidth - Math.floor(this._radius / 2);
    this._y = containerHalfHeight - Math.floor(this._radius / 2);
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
