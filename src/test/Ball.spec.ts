const chai = require('chai');
const expect = chai.expect;
import { Ball } from '../components/Ball';

describe('Ball', () => {
  let ball: Ball = null;

  beforeEach(() => {
    ball = new Ball({ radius: 10, x: 50, y: 50, vx: 10, vy: -5 });
  });

  it('initializes correctly', () => {
    expect(ball.x).to.equal(50);
    expect(ball.y).to.equal(50);
    expect(ball.radius).to.equal(10);
  });

  describe('#draw', () => {
    it('should draw on canvas');
  });

  describe('#reset', () => {
    it('should reset ball position and direction', () => {
      ball.reset(10, 10);
      expect(ball.x).to.equal(10);
      expect(ball.y).to.equal(10);
      expect(ball.vx).to.equal(-10);
      expect(ball.vy).to.equal(5);
    });
  });

  describe('#resetPosition', () => {
    it('should reset ball position', () => {
      ball.resetPosition(10, 10);
      expect(ball.x).to.equal(10);
      expect(ball.y).to.equal(10);
    });
  });

  describe('#resetDirection', () => {
    it('should reset ball direction', () => {
      ball.resetDirection();
      expect(ball.vx).to.equal(-10);
      expect(ball.vy).to.equal(5);
    });
  });

  describe('#reverseVxDirection', () => {
    it('should reverse vx direction', () => {
      ball.reverseVxDirection();
      expect(ball.vx).to.equal(-10);
    });
  });

  describe('#reverseVyDirection', () => {
    it('should reverse vy direction', () => {
      ball.reverseVyDirection();
      expect(ball.vy).to.equal(5);
    });
  });

  describe('#move', () => {
    it('should increment x and y by appropriate amount from vx, vy', () => {
      ball.move();
      expect(ball.x).to.equal(60);
      expect(ball.y).to.equal(45);
    });
  });

});
