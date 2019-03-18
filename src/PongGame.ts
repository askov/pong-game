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

  private resetBallPosition() {
    const {
      halfHeight,
      halfWidth,
    } = this._gameField;

    this._ball.x = halfWidth - Math.floor(this._ball.radius / 2);
    this._ball.y = halfHeight - Math.floor(this._ball.radius / 2);
  }

  private resetBallDirection() {
    this._ball.reverseVxDirection();
    this._ball.reverseVyDirection();
  }

  private resetBall() {
    this.resetBallPosition();
    this.resetBallDirection();
  }

  private drawBall(): void {
    const {
      radius,
      color,
      x,
      y,
    } = this._ball;

    this._ctx.fillStyle = color;
    this._ctx.beginPath();
    this._ctx.arc(x, y, radius, 0, 2 * Math.PI);
    this._ctx.fill();
  }

  private moveBall(): void {
    const {
      radius,
      x,
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

  private calculatePaddleYByTargetY(paddleHeight: number, y: number) {
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
    const players = [this._player1, this._player2];

    players.forEach(player => {
      const { x, y ,width, height, color } = player.getPaddleConfig();
      this._ctx.fillStyle = color;
      this._ctx.fillRect(x, y, width, height);
    })
  }

  private drawBackground(): void {
    const {
      color,
      width,
      halfWidth,
      height
    } = this._gameField;
    this._ctx.fillStyle = color;
    this._ctx.fillRect(0, 0, width, height);

    // Middle line
    this._ctx.beginPath();
    this._ctx.strokeStyle = 'white';
    this._ctx.moveTo(halfWidth, 0);
    this._ctx.setLineDash([8, 3]);
    this._ctx.lineTo(halfWidth, height);
    this._ctx.stroke();
  }

  private drawScore(): void {
    // Font presets
    const fontSize = 100;
    this._ctx.font = `${fontSize}px Arial`;
    this._ctx.strokeStyle = 'gray';
    this._ctx.textBaseline = "middle";
    this._ctx.setLineDash([]);

    const {
      width,
      halfHeight
    } = this._gameField;

    // Player 1
    const score1 = `${this._player1.score}`;
    this._ctx.strokeText(
        score1,
        Math.floor(width * 0.1),
        halfHeight
    );

  //  Player 2
    const score2 = `${this._player2.score}`;
    this._ctx.strokeText(
        score2,
        Math.floor(width * 0.9) - this._ctx.measureText(score2).width,
        halfHeight
    );
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

  private autoMoveComputerPaddle(): void {
    const { height } = this._player2.getPaddleConfig();
    const { y } = this._ball;
    const paddlePos = this.calculatePaddleYByTargetY(height, y);
    this._player2.movePaddle(paddlePos);
  }

  private resizeCanvas() {
    this._ctx.canvas.width = this._gameField.width;
    this._ctx.canvas.height = this._gameField.height;
  }

  private updateGameState(gameState: GameState) {
    this._gameState = gameState;
  }

  private handleMouseMove(y: number) {
    const { height } = this._player1.getPaddleConfig();
    const paddlePos = this.calculatePaddleYByTargetY(height, y);

    this._player1.movePaddle(paddlePos);
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

  private run = (): void => {
    if (this._player1.score === this.maxScore) {
      this.updateGameState(GameState.Finished);
      this.drawFinalScreen(this._player1.name);
    } else if (this._player2.score === this.maxScore) {
      this.drawFinalScreen(this._player2.name);
      this.updateGameState(GameState.Finished);
    } else {
      // Computer turn
      this.autoMoveComputerPaddle();
      // Background
      this.drawBackground();
      // Score
      this.drawScore();
      // Ball
      this.moveBall();
      this.drawBall();
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
