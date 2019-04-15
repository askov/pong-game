interface GameObjectBasic {
  color?: string;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
}

interface PaddleConfig extends GameObjectBasic {
  width?: number;
  height?: number;
}

interface BallConfig extends GameObjectBasic {
  radius?: number;
}
