export class Paddle {
  constructor(
    private _x: number = 0,
    private _y: number = 0,
    private _color: string = 'white',
    private _width: number = 10,
    private _height: number = 80,
    private _vx: number = 0,
    private _vy: number = 1,
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

  get vx(): number {
    return this._vx;
  }

  get vy(): number {
    return this._vy;
  }

  get width(): number {
    return this._width;
  }

  get height(): number {
    return this._height;
  }

  move(): void {
    this._x += this._vx;
    this._y += this._vy;
  }


}