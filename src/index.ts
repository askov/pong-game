import { PongGame } from './PongGame';

const canvas = <HTMLCanvasElement>document.getElementById('pong-game');
const pongGame = new PongGame(canvas);
pongGame.start();
