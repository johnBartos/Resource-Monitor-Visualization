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

describe('load reducer', function () {
  let initialState;
  let now;

  beforeEach(function () {
    initialState = {
      duration: 2 * 60 * 1000,
      counter: 0,
      threshold: 1,
      alarming: false,
      triggeredOn: [],
      resolvedOn: []
    };

    now = Date.now();
  });

  it('returns initial state', function () {
    const actual = loadAlarm(initialState, {});
    expect(actual).to.deep.equal(initialState);
  });

  describe('READING_RECEIVED', function () {
    describe('Alarming: false', function () {
        it('increments the counter with the reading interval when the reading value is above the threshold', function () {
          const reading = overThresholdReading();

          const expected = {
            ...initialState,
            counter: reading.interval
          };

          const actual = loadAlarm(initialState, {
            type: 'READING_RECEIVED',
            reading
          });

          expect(actual).to.deep.equal(expected);
        });

        it('resets the counter if the reading value is below the threshold', function () {
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
            reading: underThresholdReading()
          });

          expect(actual).to.deep.equal(expected);
        });

      it('responds when the counter exceeds the duration', function () {
        initialState = {
          ...initialState,
          duration: 10,
          counter: 9
        };

        const expected = {
          ...initialState,
          alarming: true,
          counter: 0,
          triggeredOn: [now]
        };

        const actual = loadAlarm(initialState, {
          type: 'READING_RECEIVED',
          reading: overThresholdReading(now)
        });

        expect(actual).to.deep.equal(expected);
      });
    });
  })
});