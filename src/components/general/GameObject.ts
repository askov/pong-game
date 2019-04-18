/* tslint:disable:variable-name */
export default class GameObject {
  constructor(
    protected _color: string = 'gray',
    protected _x: number = 0,
    protected _y: number = 0,
    protected _vx: number = 0,
    protected _vy: number = 0,
  ) {}
  get color(): string {
    return this._color;
  }
  set color(color: string) {
    this._color = color;
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
  set vx(vx: number) {
    this._vx = vx;
  }
  set vy(vy: number) {
    this._vy = vy;
  }
}
