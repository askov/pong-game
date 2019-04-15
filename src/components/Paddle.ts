import GameObject from './general/GameObject';

/* tslint:disable:variable-name */
export class Paddle extends GameObject{
  [key: string]: any;
  private _width: number = 10;
  private _height: number = 80;
  constructor(config?: Partial<PaddleConfig>) {
    super();
    Object.keys(config || {}).forEach((key: keyof PaddleConfig) => {
      this[`_${key}`] = config[key];
    });
  }
  get width(): number {
    return this._width;
  }

  get height(): number {
    return this._height;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  private calculateYByTargetY(targetY: number, fieldHeight: number) {
    const halfPaddleHeight = Math.floor(this.height / 2);
    const minYLimit = halfPaddleHeight;
    const maxYLimit = fieldHeight - halfPaddleHeight;
    if (targetY < minYLimit) {
      return 0;
    }
    if (targetY > maxYLimit) {
      return fieldHeight - this.height;
    }
    return targetY - halfPaddleHeight;
  }

  setPaddleCenterToY(y: number, fieldHeight: number) {
    this.y = this.calculateYByTargetY(y, fieldHeight);
  }
}
