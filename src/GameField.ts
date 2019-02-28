export class GameField {
  constructor(
    private _color: string = 'gray',
    private _width: number = 300,
    private _height: number = 200,
    ) {
      // console.log('constructor GameField');
  }

  get color(): string {
    return this._color;
  }

  get width(): number {
    return this._width;
  }

  get height(): number {
    return this._height;
  }

  isLeftBorder = (x: number): boolean => {
    return x === 0;
  }

  isRightBorder = (x: number): boolean => {
    return x === this._width;
  }

  isTopBorder = (y: number): boolean => {
    return y === 0;
  }

  isBottomBorder = (y: number): boolean => {
     return y === this._height;
  }

}