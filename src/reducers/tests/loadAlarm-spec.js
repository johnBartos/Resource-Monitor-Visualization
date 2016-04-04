import { expect } from 'chai';
import loadAlarm from '../loadAlarm';

const overThresholdReading = (date) => {
  return {
    date: date || Date.now(),
    value: Number.MAX_SAFE_INTEGER
  };
};

const underThresholdReading = (date) => {
  return {
    date: date || Date.now(),
    value: Number.MIN_SAFE_INTEGER
  };
};

describe('loadAlarm reducer', function () {
  let initialState;
  let now;

  beforeEach(function () {
    initialState = {
      duration: 2 * 60 * 1000,
      startDate: undefined,
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
    describe('alarming is false', function () {
      it('sets startDate if value is above threshold', function () {
        const reading = overThresholdReading(now);

        const expected = {
          ...initialState,
          startDate: now
        };

        const actual = loadAlarm(initialState, {
          type: 'READING_RECEIVED',
          payload: reading
        });

        expect(actual).to.deep.equal(expected);
      });

      it('does not set startDate if it is already set and value is above threshold', function () {
        initialState = {
          ...initialState,
          startDate: now
        };

        const actual = loadAlarm(initialState, {
          type: 'READING_RECEIVED',
          payload: overThresholdReading(now + 10)
        });

        expect(actual).to.deep.equal(initialState);
      });

      it('sets startDate to undefined if value is below threshold', function () {
        initialState = {
          ...initialState,
          startDate: now
        };

        const expected = {
          ...initialState,
          startDate: undefined
        };

        const actual = loadAlarm(initialState, {
          type: 'READING_RECEIVED',
          payload: underThresholdReading(now)
        });

        expect(actual).to.deep.equal(expected);
      });

      it('sets triggered to true and alarming to true if time difference exceeds duration', function () {
        initialState = {
          ...initialState,
          duration: 10,
          startDate: now - 10
        };

        const expected = {
          ...initialState,
          startDate: undefined,
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

      it('sets startDate if value is below threshold', function () {
        const expected = {
          ...initialState,
          startDate: now
        };

        const actual = loadAlarm(initialState, {
          type: 'READING_RECEIVED',
          payload: underThresholdReading(now)
        });

        expect(actual).to.deep.equal(expected);
      });

      it('does not set startDate if it is already set and value is above threshold', function () {
        initialState = {
          ...initialState,
          startDate: now
        };

        const actual = loadAlarm(initialState, {
          type: 'READING_RECEIVED',
          payload: underThresholdReading(now + 10)
        });

        expect(actual).to.deep.equal(initialState);
      });

      it('resets startDate if value is above threshold', function () {
        initialState = {
          ...initialState,
          startDate: now
        };

        const expected = {
          ...initialState,
          startDate: undefined
        };

        const actual = loadAlarm(initialState, {
          type: 'READING_RECEIVED',
          payload: overThresholdReading()
        });

        expect(actual).to.deep.equal(expected);
      });

      it('sets triggered to true and alarming to false if time difference exceeds duration', function () {
        initialState = {
          ...initialState,
          duration: 10,
          startDate: now - 10
        };

        const expected = {
          ...initialState,
          startDate: undefined,
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