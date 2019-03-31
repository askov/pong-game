import {
  GameField,
} from './GameField';
import {
  Ball,
} from './Ball';
import {
  Player,
} from './Player';
import {
  FinalScreen,
} from './FinalScreen';

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
  private ctx: CanvasRenderingContext2D;
  private field = new GameField('#303030', window.innerWidth, window.innerHeight);
  private ball = new Ball('white', 10, 0, 0, 8, 4);
  private state = GameState.Running;
  private players = [
    new Player('You', {
      x: 0,
      y: 10,
      width: this.paddleWidth,
      height: 90,
      color: 'white',
    }),
    new Player('Computer', {
      x: (window.innerWidth - this.paddleWidth),
      y: 10,
      width: this.paddleWidth,
      height: 90,
      color: 'white',
    }),
  ];

  constructor(private canvas: HTMLCanvasElement) {
  }

  // Ball
  private getCurrentBallZone(player: Player): BallZone {
    const { width, y: paddleY, height } = player.getPaddleConfig();
    const {
      x,
      y,
      radius,
    } = this.ball;

    if (
      (x - radius <= 0 + width) ||
      (x + radius >= this.field.width - width)
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
    } = this.field;
    this.ball.resetBall(halfWidth, halfHeight);
  }

  private moveBall(): void {
    const {
      radius,
      y,
      reverseVxDirection,
      reverseVyDirection,
      move,
    } = this.ball;

    const {
      isTopBorder,
      isBottomBorder,
    } = this.field;

    if (
      isBottomBorder(y + radius) ||
      isTopBorder(y - radius)
    ) {
      reverseVyDirection();
    }

    // Here player is the one "under strike", i.e.
    // player     <-o   opponent
    // opponent   o->   player
    const [player, opponent] = this.ball.vx > 0
      ? [...this.players].reverse()
      : this.players;

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
    this.players.forEach((player) => {
      player.drawPaddle(this.ctx);
    });
  }

  private moveComputerPaddle(): void {
    const { height } = this.field;
    const { y } = this.ball;
    this.players[1].movePaddle(y, height);
  }

  private movePlayerPaddle(y: number): void {
    const { height } = this.field;
    this.players[0].movePaddle(y, height);
  }

  // Game state
  private updateGameState(gameState: GameState) {
    this.state = gameState;
  }

  // Handlers
  private resizeCanvas() {
    this.ctx.canvas.width = this.field.width;
    this.ctx.canvas.height = this.field.height;
  }

  private handleMouseMove(y: number) {
    this.movePlayerPaddle(y);
  }

  private handleMouseClick() {
    if (this.state === GameState.Finished) {
      this.restart();
    }
  }

  private addCanvasListeners(canvas: HTMLCanvasElement) {
    canvas.addEventListener('mousemove', (e) => {
      this.handleMouseMove(e.clientY);
    });

    canvas.addEventListener('click', () => {
      this.handleMouseClick();
    });
  }

  // Main
  private run = (): void => {
    const winner = this.players.find(player => player.isWinner(this.maxScore));
    if (winner) {
      this.updateGameState(GameState.Finished);
      // this.drawFinalScreen(winner.name);
      FinalScreen.draw(this.ctx, winner.name, this.field);
    } else {
      // Computer turn
      this.moveComputerPaddle();
      // Background
      this.field.draw(this.ctx, this.players[0].score, this.players[1].score);
      // Ball
      // this.moveBall();
      this.ball.draw(this.ctx);
      // Paddles
      this.drawPaddles();
      window.requestAnimationFrame(this.run);
    }
  }

  private restart() {
    this.updateGameState(GameState.Running);
    // Score
    this.players.forEach(player => player.reset());
    this.start();
  }

  start(): void {
    if (this.canvas && this.canvas.getContext) {
      this.ctx = this.canvas.getContext('2d');
      this.resizeCanvas();
      // Events
      this.addCanvasListeners(this.canvas);
      // Ball
      this.resetBall();
      // Main
      window.requestAnimationFrame(this.run);
    }
  }

}
