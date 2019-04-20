const chai = require('chai');
const expect = chai.expect;
import { Player } from '../components/Player';

describe('Player', () => {
  let player: Player = null;

  beforeEach(() => {
    player = new Player('testplayer', {});
  });

  it('initializes correctly', () => {
    expect(player.name).to.equal('testplayer');
    expect(player.score).to.equal(0);
  });

  describe('#isWinner', () => {
    it('should return false if player score is less than provided number', () => {
      player.incrementScore();
      expect(player.isWinner(3)).to.equal(false);
    });
    it('should return true if player score is equal to provided number', () => {
      player.incrementScore();
      player.incrementScore();
      player.incrementScore();
      expect(player.isWinner(3)).to.equal(true);
    });
  });

  describe('#incrementScore', () => {
    it('should increment score by one', () => {
      player.incrementScore();
      expect(player.score).to.equal(1);
    });
  });

  describe('#reset', () => {
    it('should reset score', () => {
      player.incrementScore();
      player.reset();
      expect(player.score).to.equal(0);
    });
  });
});
