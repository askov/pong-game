// import { PongGame } from './PongGame';
import { GameField } from './GameField';

// const pongGame = new PongGame();
const gameField = new GameField('red', 300, 600);

// gameField.debug();

const canvas  = <HTMLCanvasElement> document.getElementById('pong-game');

if (canvas.getContext) {
  const width = canvas.width;
  const height = canvas.height;
  const color = 'gray';

  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, width, height);
}