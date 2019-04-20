import RectangleGameObject from './general/RectangleGameObject';
import { PaddleConfig } from '../../app';

/* tslint:disable:variable-name */
export class Paddle extends RectangleGameObject {
  [key: string]: any;

  constructor(config?: Partial<PaddleConfig>) {
    super();
    Object.keys(config || {}).forEach((key: keyof PaddleConfig) => {
      this[`_${key}`] = config[key];
    });
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  setPaddleCenterToY(y: number, fieldHeight: number) {
    this.y = this.calculateYByTargetY(y, fieldHeight);
  }

  getConfig(): PaddleConfig {
    return {
      color: this.color,
      width: this.width,
      height: this.height,
      x: this.x,
      y: this.y,
    };
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

}
