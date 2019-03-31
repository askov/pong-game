import { GameField } from './GameField';

export class FinalScreen {
  static draw(ctx: CanvasRenderingContext2D, winnerName: string, field: GameField): void {
    const {
      halfHeight,
      halfWidth,
      width,
      height,
    } = field;
    ctx.fillStyle = '#6b42f4';
    ctx.fillRect(0, 0, width, height);
    ctx.font = `${40}px Arial`;
    ctx.fillStyle = 'white';
    const text = `${winnerName} won! Click to play again`;
    const halfTextWidth = Math.floor(ctx.measureText(text).width / 2);
    ctx.fillText(text, halfWidth - halfTextWidth, halfHeight);
  }
}
