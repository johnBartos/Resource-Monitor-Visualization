import { expect } from 'chai';
import loadAlarm from '../loadAlarm';

describe('load reducer', function () {
  let initialState;
  let now;

  beforeEach(function () {
    initialState = {
      duration: 2 * 60 * 1000,
      interval: 10 * 1000,
      steps: this.duration / this.interval,
      valueThreshold: 1,
      counters: {
        one: 0,
        five: 0,
        ten: 0
      }
    };
    now = Date.now();
  });

  it ('returns initial state', function () {
    const actual = loadAlarm(initialState, {});
    expect(actual).to.deep.equal(initialState);
  });
});