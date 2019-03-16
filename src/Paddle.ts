export class Paddle {
  [key: string]: any;

  private _x: number = 0;
  private _y: number = 0;
  private _color: string = 'white';
  private _width: number = 10;
  private _height: number = 80;
  private _vx: number = 0;
  private _vy: number = 0;

  constructor(config?: Partial<PaddleConfig>) {
    Object.keys(config || {}).forEach((key: keyof PaddleConfig) => {
      this[`_${key}`] = config[key];
    });
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
    return this.vx;
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

  set x(x: number) {
    this._x = x;
  }

  set y(y: number) {
    this._y = y;
  }


  // move(x: number, y: number): void {
  //   this._x += x;
  //   this._y += y;
  // }
  // move(): void {
  //   //   this._x += this._vx;
  //   //   this._y += this._vy;
  //   // }

}
