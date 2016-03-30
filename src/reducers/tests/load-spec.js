import { expect } from 'chai';
import load from '../load';

describe('load reducer', function () {
  let initialState;
  let now;

  beforeEach(function () {
    initialState = {
      threshold: 10 * 60 * 1000,
      readings: []
    };
    now = Date.now();
  });

  it('returns initial state', function () {
    const actual = load(initialState, {});
    expect(actual).to.deep.equal(initialState);
  });

  it('handles READING_RECEIVED', function () {
    const reading = {
      date: now,
      one: 1,
      five: 5,
      ten: 10
    };

    const expected = {
      ...initialState,
      readings: [reading]
    };

    const actual = load(initialState, {
      type: 'READING_RECEIVED',
      reading
    });

    expect(actual).to.deep.equal(expected);
  });

  it('prunes readings below the threshold on READING_RECEIVED', function () {
    const oldReading = {
      date: now - initialState.threshold
    };
    const newReading = {
      date: now
    };

    initialState = {
      ...initialState,
      readings: [oldReading]
    };

    const expected = {
      ...initialState,
      readings: [newReading]
    };

    const actual = load(initialState, {
      type: 'READING_RECEIVED',
      reading: newReading
    });

    expect(actual).to.deep.equal(expected);
  });
});
