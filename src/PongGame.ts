import {
  GameField
} from './GameField';
import {
  Ball
} from './Ball';
import {
  Player
} from './Player';
import {
  ComputerPlayer
} from './ComputerPlayer';
import './styles/index.css';

enum GameState {
  Running,
  Lost,
  Won,
}

export class PongGame {
  private _ctx: CanvasRenderingContext2D;
  private _gameField = new GameField('blue', 400, 200);
  private _ball = new Ball('white', 5, 20, 20, 1, 1);
  private _gameState = GameState.Running;
  private _player1 = new Player('Player 1');
  private _player2 = new ComputerPlayer('Player 2', {
    x: 395,
    y: 10,
    width: 5,
    height: 40,
    color: 'gold'
  });

  constructor(private _canvas: HTMLCanvasElement) {}

  private drawBall(): void {
    const {
      radius,
      color,
      x,
      y,
      reverseVxDirection,
      reverseVyDirection,
      move
    } = this._ball;

    const {
      isTopBorder,
      isBottomBorder,
      isLeftBorder,
      isRightBorder
    } = this._gameField;

    this._ctx.fillStyle = color;
    this._ctx.beginPath();
    this._ctx.arc(x, y, radius, 0, 2 * Math.PI);
    this._ctx.fill();

    if (
      isBottomBorder(y + radius) ||
      isTopBorder(y - radius)
    ) {
      reverseVyDirection();
    }
    if (
      isLeftBorder(x - radius) ||
      isRightBorder(x + radius)
    ) {
      reverseVxDirection();
    }
    move();
  }

  private drawPaddles(): void {
    const {
      color,
      x,
      y,
      width,
      height
    } = this._player2.getPaddleConfig();
    // console.log('height', height)
  //   const [x, y] = this._player2.getPaddlePosition();
  //   const [width, height] = this._player2.getPaddleSize();
    this._ctx.fillStyle = color;
    this._ctx.fillRect(x, y, width, height);
  }

  private drawBackground(): void {
    const {
      color,
      width,
      height
    } = this._gameField;
    this._ctx.fillStyle = color;
    this._ctx.fillRect(0, 0, width, height);
  }


  private draw = (): void => {
    // Background
    this.drawBackground();
    // Ball
    this.drawBall();
    // Paddles
    this.drawPaddles();

    window.requestAnimationFrame(this.draw);
  }


  private resizeCanvas() {
    this._ctx.canvas.width = this._gameField.width;
    this._ctx.canvas.height = this._gameField.height;
  }

  private updateGameState(gameState: GameState) {
    this._gameState = gameState;
  }

  start(): void {
    if (this._canvas.getContext) {
      this._ctx = this._canvas.getContext('2d');
      this.resizeCanvas();
      window.requestAnimationFrame(this.draw);
    }
  }


}
