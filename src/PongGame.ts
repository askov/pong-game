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
  private _gameField = new GameField('#303030', 400, 200);
  private _ball = new Ball('white', 5, 20, 20, 1, 1);
  private _gameState = GameState.Running;
  private _player1 = new ComputerPlayer('Player 1', {
    x: 0,
    y: 10,
    width: 5,
    height: 40,
    color: '#aaefff'
  });
  private _player2 = new ComputerPlayer('Player 2', {
    x: 395,
    y: 10,
    width: 5,
    height: 40,
    color: '#f4d142'
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

    if (isRightBorder(x + radius)) {
      this._player1.incrementScore();
      reverseVxDirection();
    }

    if(isLeftBorder(x - radius)) {
      this._player2.incrementScore();
      reverseVxDirection();
    }

    move();
  }

  private calculatePaddlePos(paddleHeight: number, y: number) {
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

  private drawPaddles(): void {

    // Player 1 (Human)
    const p1Paddle = this._player1.getPaddleConfig();
    this._ctx.fillStyle = p1Paddle.color;
    this._ctx.fillRect(p1Paddle.x, p1Paddle.y, p1Paddle.width, p1Paddle.height);


    // Player 2 (Computer)
    const p2Paddle = this._player2.getPaddleConfig();
    const paddlePos = this.calculatePaddlePos(p2Paddle.height, this._ball.y);
    this._player2.movePaddle(paddlePos);
    this._ctx.fillStyle = p2Paddle.color;
    this._ctx.fillRect(p2Paddle.x, p2Paddle.y, p2Paddle.width, p2Paddle.height);
  }

  private drawBackground(): void {
    const {
      color,
      width,
      height
    } = this._gameField;
    this._ctx.fillStyle = color;
    this._ctx.fillRect(0, 0, width, height);

    // Middle line
    this._ctx.beginPath();
    this._ctx.strokeStyle = 'white';
    this._ctx.moveTo(Math.floor(width / 2), 0);
    this._ctx.setLineDash([8, 3]);
    this._ctx.lineTo(Math.floor(width / 2), height);
    this._ctx.stroke();
  }

  private drawScore() {
    this._ctx.font = "30px Arial";
    this._ctx.strokeStyle = 'gray';
    this._ctx.textBaseline = "middle";
    this._ctx.setLineDash([]);
    const {
      width,
      height
    } = this._gameField;
    // Player 1
    const score1 = `${this._player1.score}`;
    // const {width = this._ctx.measureText(score2);
    this._ctx.strokeText(score1, Math.floor(width * 0.1), Math.floor( height / 2));

  //  Player 2
    const score2 = `${this._player2.score}`;
    this._ctx.strokeText(score2, Math.floor(width * 0.9) - this._ctx.measureText(score2).width, Math.floor( height / 2));

  }

  private draw = (): void => {
    // Background
    this.drawBackground();
    // Score
    this.drawScore();
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

  private updatePlayerPaddle(y: number) {
    const p1Paddle = this._player1.getPaddleConfig();
    const paddlePos = this.calculatePaddlePos(p1Paddle.height, y);

    this._player1.movePaddle(paddlePos);
  }

  private addCanvasListeners(canvas: HTMLCanvasElement) {
    canvas.addEventListener('mousemove', (e)=>{
      this.updatePlayerPaddle(e.clientY);
    })
  }

  start(): void {
    if (this._canvas && this._canvas.getContext) {
      this.addCanvasListeners(this._canvas);
      this._ctx = this._canvas.getContext('2d');
      this.resizeCanvas();
      window.requestAnimationFrame(this.draw);
    }
  }


}
