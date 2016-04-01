import { expect } from 'chai';
import sinon from 'sinon';
import alarms from '../alarms';
import loadAlarm from '../loadAlarm';
import test from '../test';

describe('load reducer', function () {
  let initialState;
  let now;

  beforeEach(function () {
    initialState = {
      loadAlarms: {},
      alarmEvents: {}
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
    const action = {
      type: 'READING_RECEIVED',
      readings: {
        foo: 0
      }
    };

    const expected = {
      ...initialState,
      loadAlarms: {
        foo: loadAlarm({}, action)
      }
    };

    const actual = alarms(initialState, action);
    expect(actual).to.deep.equal(expected);
  });
});
