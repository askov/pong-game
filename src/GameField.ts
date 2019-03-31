/* tslint:disable:variable-name */
export class GameField {
  constructor(
    private _color: string = 'gray',
    private _width: number = 300,
    private _height: number = 200,
  ) {
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

  get halfWidth(): number {
    return Math.floor(this._width / 2);
  }

  get halfHeight(): number {
    return Math.floor(this._height / 2);
  }

  isTopBorder = (y: number): boolean => {
    return y <= 0;
  }

  isBottomBorder = (y: number): boolean => {
    return y >= this._height;
  }

  private drawScore(ctx: CanvasRenderingContext2D, score1: number, score2: number): void {
    // Font presets
    const fontSize = 100;
    ctx.font = `${fontSize}px Arial`;
    ctx.strokeStyle = 'gray';
    ctx.textBaseline = 'middle';
    ctx.setLineDash([]);
    // Player 1
    ctx.strokeText(
      `${score1}`,
      Math.floor(this.width * 0.1),
      this.halfHeight,
    );

    //  Player 2
    ctx.strokeText(
      `${score2}`,
      Math.floor(this.width * 0.9) - ctx.measureText(`${score2}`).width,
      this.halfHeight,
    );
  }

  private drawBackground(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.fillRect(0, 0, this.width, this.height);

    // Middle line
    ctx.beginPath();
    ctx.strokeStyle = 'white';
    ctx.moveTo(this.halfWidth, 0);
    ctx.setLineDash([8, 3]);
    ctx.lineTo(this.halfWidth, this.height);
    ctx.stroke();
  }

  draw(ctx: CanvasRenderingContext2D, score1: number, score2: number): void {
    this.drawBackground(ctx);
    this.drawScore(ctx, score1, score2);
  }

}
