export interface GameObjectBasic {
  color?: string;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
}

export interface PaddleConfig extends GameObjectBasic {
  width?: number;
  height?: number;
}

export interface BallConfig extends GameObjectBasic {
  radius?: number;
}
