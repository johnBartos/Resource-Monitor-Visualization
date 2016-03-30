import { expect } from 'chai';
import load from '../load';

describe('load reducer', function () {
  let initialState;

  beforeEach(function () {
    initialState = {
      duration: 10 * 60,
      readings: []
    };
  });

  it('returns initial state', function () {
    const actual = load(initialState, {});
    expect(actual).to.deep.equal(initialState);
  });
});
