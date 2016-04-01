import { expect } from 'chai';
import loadAlarm from '../loadAlarm';

const overThresholdReading = (date) => {
  return {
    date: date || Date.now(),
    value: Number.MAX_SAFE_INTEGER,
    interval: 10 * 1000
  };
};

const underThresholdReading = (date) => {
  return {
    date: date || Date.now(),
    value: Number.MIN_SAFE_INTEGER,
    interval: 10 * 1000
  };
};

describe('loadAlarm reducer', function () {
  let initialState;
  let now;

  beforeEach(function () {
    initialState = {
      duration: 2 * 60 * 1000,
      counter: 0,
      threshold: 1,
      triggered: false,
      alarming: false
    };

    now = Date.now();
  });

  it('returns initial state', function () {
    const actual = loadAlarm(initialState, {});
    expect(actual).to.deep.equal(initialState);
  });

  describe('READING_RECEIVED', function () {
    describe('alarming is true', function () {
      it('increments counter if value is above threshold', function () {
        const reading = overThresholdReading();

        const expected = {
          ...initialState,
          counter: reading.interval
        };

        const actual = loadAlarm(initialState, {
          type: 'READING_RECEIVED',
          payload: reading
        });

        expect(actual).to.deep.equal(expected);
      });

      it('resets counter if value is below threshold', function () {
        initialState = {
          ...initialState,
          counter: 1000
        };

        const expected = {
          ...initialState,
          counter: 0
        };

        const actual = loadAlarm(initialState, {
          type: 'READING_RECEIVED',
          payload: underThresholdReading()
        });

        expect(actual).to.deep.equal(expected);
      });

      it('sets triggered to true and alarming to true if counter exceeds duration', function () {
        initialState = {
          ...initialState,
          duration: 10,
          counter: 9
        };

        const expected = {
          ...initialState,
          counter: 0,
          triggered: true,
          alarming: true
        };

        const actual = loadAlarm(initialState, {
          type: 'READING_RECEIVED',
          payload: overThresholdReading(now)
        });

        expect(actual).to.deep.equal(expected);
      });
    });
    describe('alarming is true', function () {
      beforeEach(function () {
        initialState = {
          ...initialState,
          alarming: true
        };
      });

      it('increments the counter if value is below threshold', function () {
        const reading = underThresholdReading();

        const expected = {
          ...initialState,
          counter: reading.interval
        };

        const actual = loadAlarm(initialState, {
          type: 'READING_RECEIVED',
          payload: reading
        });

        expect(actual).to.deep.equal(expected);
      });

      it('resets the counter if value is above threshold', function () {
        initialState = {
          ...initialState,
          counter: 1000
        };

        const expected = {
          ...initialState,
          counter: 0
        };

        const actual = loadAlarm(initialState, {
          type: 'READING_RECEIVED',
          payload: overThresholdReading()
        });

        expect(actual).to.deep.equal(expected);
      });

      it('sets triggered to true and alarming to false when counter exceeds duration', function () {
        initialState = {
          ...initialState,
          duration: 10,
          counter: 9
        };

        const expected = {
          ...initialState,
          counter: 0,
          triggered: true,
          alarming: false
        };

        const actual = loadAlarm(initialState, {
          type: 'READING_RECEIVED',
          payload: underThresholdReading(now)
        });

        expect(actual).to.deep.equal(expected);
      });
    });
  });
});