import { expect } from 'chai';
import load from '../historicalLoad';

describe('historicalLoad reducer', function () {
  let initialState;
  let now;

  beforeEach(function () {
    initialState = {
      threshold: 10 * 60 * 1000,
      readings: {}
    };
    now = Date.now();
  });

  it('returns initial state', function () {
    const actual = load(initialState, {});
    expect(actual).to.deep.equal(initialState);
  });

  it('handles READING_RECEIVED', function () {
    const reading = {
      id: 0,
      date: now,
      value: 0
    };

    const expected = {
      ...initialState,
      readings: {
        0: [{ date: now, value: 0 }]
      }
    };

    const actual = load(initialState, {
      type: 'READING_RECEIVED',
      payload: reading
    });

    expect(actual).to.deep.equal(expected);
  });

  it('prunes readings below the threshold on READING_RECEIVED', function () {
    const oldReading = {
      date: now - initialState.threshold - 1,
      value: 0
    };
    const newReading = {
      id: 0,
      date: now,
      value: 2
    };

    initialState = {
      ...initialState,
      readings: {
        0: [oldReading]
      }
    };

    const expected = {
      ...initialState,
      readings: {
        0: [{ date: newReading.date, value: newReading.value }]
      }
    };

    const actual = load(initialState, {
      type: 'READING_RECEIVED',
      payload: newReading
    });

    expect(actual).to.deep.equal(expected);
  });
});
