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
}
