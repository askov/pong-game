const chai = require('chai');
const expect = chai.expect;
import { Paddle } from '../components/Paddle';

describe('Paddle', () => {
  let paddle: Paddle = null;
  const initialPaddleConfig = { width: 10, height: 50 };

  beforeEach(() => {
    paddle = new Paddle(initialPaddleConfig);
  });

  it('initializes correctly', () => {
    expect(paddle.width).to.equal(10);
    expect(paddle.height).to.equal(50);
  });

  describe('#draw', () => {
    it('should draw on canvas');
  });

  describe('#setPaddleCenterToY', () => {
    it('should set paddle y position correctly if borders are not reached', () => {
      paddle.setPaddleCenterToY(100, 300);
      expect(paddle.y).to.equal(75);
    });
    it('should set paddle y position correctly if top border is reached', () => {
      paddle.setPaddleCenterToY(10, 300);
      expect(paddle.y).to.equal(0);
    });
    it('should set paddle y position correctly if bottom border is reached', () => {
      paddle.setPaddleCenterToY(280, 300);
      expect(paddle.y).to.equal(250);
    });
  });

  describe('#getConfig', () => {
    it('should return current paddle config', () => {
      const config = paddle.getConfig();
      expect(config).to.include(initialPaddleConfig);
    });
  });
});
