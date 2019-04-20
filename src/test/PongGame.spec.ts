const chai = require('chai');
const expect = chai.expect;
import { PongGame } from '../components/PongGame';

describe('PongGame', () => {
  // todo: not sure how to properly test this without mocking everything and touching too much details
  // todo: should this "glue" class be implemented differently?
  const canvas = {} as HTMLCanvasElement;

  let pongGame: PongGame = null;

  beforeEach(() => {
    // pongGame = new PongGame(canvas);
  });

  it('initializes correctly', () => {

  });

});
