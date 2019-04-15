import GameObject from './GameObject';

/* tslint:disable:variable-name */
export default class RectangleGameObject extends GameObject {
  private _width: number = 300;
  private _height: number = 200;
  constructor() {
    super();
  }
  get width(): number {
    return this._width;
  }
  get height(): number {
    return this._height;
  }
  set width(width: number) {
    this._width = width;
  }
  set height(height: number) {
    this._height = height;
  }
}
