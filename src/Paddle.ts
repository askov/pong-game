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

  draw(ctx: CanvasRenderingContext2D): void {
    const {color, x, y, width, height} = this;
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
  }

  private calculatePaddleYByTargetYx(paddleHeight: number, y: number) {
    const halfPaddleHeight = Math.floor(paddleHeight / 2 );
    const minYLimit = halfPaddleHeight;
    const maxYLimit = this._gameField.height - halfPaddleHeight;
    if (y < minYLimit) {
      return 0;
    }
    if (y > maxYLimit) {
      return this._gameField.height - paddleHeight;
    }
    return y - halfPaddleHeight;
  }

  private calculateYByTargetY(targetY: number, fieldHeight: number) {
    const halfPaddleHeight = Math.floor(this.height / 2 );
    const minYLimit = halfPaddleHeight;
    const maxYLimit = fieldHeight - halfPaddleHeight;
    // console.log('#some', targetY, halfPaddleHeight);
    if (targetY < minYLimit) {
      return 0;
    }
    if (targetY > maxYLimit) {
      console.log('#132', fieldHeight - this.heigth);
      return fieldHeight - this.height;
    }
    return targetY - halfPaddleHeight;
  }

  setPaddleCenterToY(y: number, fieldHeight: number) {
    this.y = this.calculateYByTargetY(y, fieldHeight);
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
