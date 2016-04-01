import { expect } from 'chai';
import alarms from '../alarms';
import loadAlarm from '../loadAlarm';

describe('alarms reducer', function () {
  let initialState;
  let now;

  beforeEach(function () {
    initialState = {
      loadAlarms: {},
      loadAlarmEvents: {}
    };
    now = Date.now();
  });

  it('returns initial state', function () {
    const expected = alarms(initialState, {});
    expect(expected).to.deep.equal(initialState);
  });

  it('initializes a load alarm on LOAD_ALARM_ADDED', function () {
    const expected = {
      ...initialState,
      loadAlarms: {
        ...initialState.loadAlarms,
        0: loadAlarm(undefined, {})
      },
      loadAlarmEvents: {
        0: []
      }
    };

    const actual = alarms(initialState, {
      type: 'LOAD_ALARM_ADDED',
      id: 0
    });

    expect(actual).to.deep.equal(expected);
  });

  // todo: sinon mock
  it('updates load alarms on READING_RECEIVED', function () {
    initialState.loadAlarms.foo = {};
    initialState.loadAlarmEvents.foo = [];
    const action = {
      type: 'READING_RECEIVED',
      payload: {
        id: 'foo',
        value: 1,
        interval: 1000
      }
    };

    const expected = {
      ...initialState,
      loadAlarms: {
        foo: loadAlarm({}, action)
      },
      loadAlarmEvents: {
        foo: []
      }
    };

    const actual = alarms(initialState, action);
    expect(actual).to.deep.equal(expected);
  });
});
