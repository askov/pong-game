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
  Finished,
}

enum BallZone {
  Center,
  Out,
  Reflect,
}

export class PongGame {
  private readonly maxScore = 3;
  private readonly paddleWidth = 20;
  private _ctx: CanvasRenderingContext2D;
  private _gameField = new GameField('#303030', window.innerWidth, window.innerHeight);
  private _ball = new Ball('white', 10, 0, 0, 8, 4);
  private _gameState = GameState.Running;
  private _player1 = new Player('You', {
    x: 0,
    y: 10,
    width: this.paddleWidth,
    height: 90,
    color: 'white',
  });
  private _player2 = new ComputerPlayer('Computer', {
    x: (window.innerWidth - this.paddleWidth),
    y: 10,
    width: this.paddleWidth,
    height: 90,
    color: 'white'
  });

  constructor(private _canvas: HTMLCanvasElement) {}


  // Ball
  private getCurrentBallZone(player: Player): BallZone {
    const { width , y: paddleY, height, } = player.getPaddleConfig();
    const {
      x,
      y,
      radius,
    } = this._ball;

    if (
        (x - radius <= 0 + width) ||
        (x + radius >= this._gameField.width - width)
    ) {
      if ((y > (paddleY - radius)) && (y < (paddleY + height + radius))) {
        return BallZone.Reflect;
      }
      return BallZone.Out;

    }

    return BallZone.Center;
  }

  private resetBall() {
    const {
      halfHeight,
      halfWidth,
    } = this._gameField;
    this._ball.resetBall(halfWidth, halfHeight);
  }

  private moveBall(): void {
    const {
      radius,
      y,
      reverseVxDirection,
      reverseVyDirection,
      move
    } = this._ball;

    const {
      isTopBorder,
      isBottomBorder,
    } = this._gameField;

    if (
        isBottomBorder(y + radius) ||
        isTopBorder(y - radius)
    ) {
      reverseVyDirection();
    }


    // Here player is the one "under strike", i.e.
    // player     <-o   opponent
    // opponent   o->   player
    const [player, opponent] = this._ball.vx > 0
        ? [this._player2, this._player1]
        : [this._player1, this._player2];

    const ballState = this.getCurrentBallZone(player);

    // To simplify the check we assume that player is already lost, when the ball is out
    // but not when ball is on the appropriate field border
    if (ballState === BallZone.Reflect) {
      reverseVxDirection();
    }
    if (ballState === BallZone.Out) {
      opponent.incrementScore();
      this.resetBall();
    }

    move();
  }

  // Paddles
  private drawPaddles(): void {
    const players = [this._player1, this._player2];

    players.forEach(player => {
      player.paddle.draw(this._ctx);
    })
  }

  private moveComputerPaddle(): void {
    const { height } = this._gameField;
    const { y } = this._ball;
    this._player2.paddle.setPaddleCenterToY(y, height);
  }

  private movePlayerPaddle(y: number): void {
    const { height } = this._gameField;
    this._player1.paddle.setPaddleCenterToY(y, height);
  }

  // Game state
  private updateGameState(gameState: GameState) {
    this._gameState = gameState;
  }

  private drawFinalScreen(winnerName: string): void {
    const {
      halfHeight,
      halfWidth,
      width,
      height
    } = this._gameField;
    this._ctx.fillStyle = '#6b42f4';
    this._ctx.fillRect(0, 0, width, height);
    this._ctx.font = `${40}px Arial`;
    this._ctx.fillStyle = 'white';
    const text = `${winnerName} won! Click to play again`;
    const halfTextWidth = Math.floor(this._ctx.measureText(text).width / 2);
    this._ctx.fillText(text, halfWidth - halfTextWidth, halfHeight);
  }

  // Handlers
  private resizeCanvas() {
    this._ctx.canvas.width = this._gameField.width;
    this._ctx.canvas.height = this._gameField.height;
  }

  private handleMouseMove(y: number) {
    this.movePlayerPaddle(y);
  }

  private handleMouseClick() {
    if (this._gameState === GameState.Finished) {
      this.restart();
    }
  }

  private addCanvasListeners(canvas: HTMLCanvasElement) {
    canvas.addEventListener('mousemove', (e)=>{
      this.handleMouseMove(e.clientY);
    });

    canvas.addEventListener('click', ()=>{
      this.handleMouseClick();
    });
  }

  // Main
  private run = (): void => {
    if (this._player1.score === this.maxScore) {
      this.updateGameState(GameState.Finished);
      this.drawFinalScreen(this._player1.name);
    } else if (this._player2.score === this.maxScore) {
      this.drawFinalScreen(this._player2.name);
      this.updateGameState(GameState.Finished);
    } else {
      // Computer turn
      this.moveComputerPaddle();
      // Background
      this._gameField.draw(this._ctx, this._player1.score, this._player2.score);
      // Ball
      this.moveBall();
      this._ball.draw(this._ctx);
      // Paddles
      this.drawPaddles();
      window.requestAnimationFrame(this.run);
    }

  }

  private restart() {
    this.updateGameState(GameState.Running);
    // Score
    this._player1.reset();
    this._player2.reset();
    this.start();
  }

  start(): void {
    if (this._canvas && this._canvas.getContext) {
      this._ctx = this._canvas.getContext('2d');
      this.resizeCanvas();
      // Events
      this.addCanvasListeners(this._canvas);
      // Ball
      this.resetBall();
      // Main
      window.requestAnimationFrame(this.run);
    }
  }


}
