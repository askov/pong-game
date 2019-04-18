const chai = require('chai');
const expect = chai.expect;
import { GameField } from '../components/GameField';

describe('GameField', () => {
  let gameField: GameField = null;

  beforeEach(() => {
    gameField = new GameField('green', 100, 101);
  });

  describe('#draw', () => {
    it('should draw on canvas');
  });

  describe('#halfWidth', () => {
    it('should return rounded down half width', () => {
      expect(gameField.halfWidth).to.equal(50);
    });
  });

  describe('#halfHeight', () => {
    it('should return rounded down half height', () => {
      expect(gameField.halfHeight).to.equal(50);
    });
  });

  describe('#isTopBorder', () => {
    it('should return true if provided y is equal or lower than zero', () => {
      expect(gameField.isTopBorder(-1)).to.equal(true);
      expect(gameField.isTopBorder(0)).to.equal(true);
    });
  });

  describe('#isBottomBorder', () => {
    it('should return true if provided y is equal or greater than height', () => {
      expect(gameField.isBottomBorder(140)).to.equal(true);
      expect(gameField.isBottomBorder(101)).to.equal(true);
    });
  });
});
