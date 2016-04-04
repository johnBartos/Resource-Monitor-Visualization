import { expect } from 'chai';
import alarms from '../alarms';
import loadAlarm from '../loadAlarm';

const makeActions = (value, now) => {
  const actions = [];
  for (let i = 1; i <= 13; i += 1) {
    const date = new Date(now.getTime());
    date.setSeconds(now.getSeconds() + (i * 10));
    actions.push({
      type: 'READING_RECEIVED',
      payload: {
        id: 'one',
        date,
        value
      }
    });
  }
  return actions;
};

describe('integration test', function () {
  let now;
  let initialState;
  let initialLoadAlarmState;

  beforeEach(function () {
    now = new Date();
    initialState = alarms(undefined, {});
    initialLoadAlarmState = loadAlarm(undefined, {});
  });

  it('triggers the alarm when the value is above 1 for two minutes and the alarm has not been triggered', function () {
    const actions = makeActions(2, now);
    const state = alarms(initialState, {
      type: 'LOAD_ALARM_ADDED',
      payload: {
        id: 'one'
      }
    });

    const expected = {
      ...initialState,
      loadAlarms: {
        one: {
          ...initialLoadAlarmState,
          alarming: true,
          triggered: true
        }
      },
      loadAlarmEvents: {
        one: [{
          date: actions[actions.length - 1].payload.date,
          value: actions[actions.length - 1].payload.value,
          resolution: false
        }]
      }
    };
    const actual = actions.reduce(alarms, state);
    expect(actual).to.deep.equal(expected);
  });

  it('resolves the alarm when the value is below 1 for two minutes and the alarm has been triggered', function () {
    const actions = makeActions(0.5, now);
    const state = alarms(initialState, {
      type: 'LOAD_ALARM_ADDED',
      payload: {
        id: 'one'
      }
    });

    const alarmingState = {
      ...state,
      loadAlarms: {
        one: {
          ...initialLoadAlarmState,
          alarming: true
        }
      }
    };

    const expected = {
      ...initialState,
      loadAlarms: {
        one: {
          ...initialLoadAlarmState,
          alarming: false,
          triggered: true
        }
      },
      loadAlarmEvents: {
        one: [{
          date: actions[actions.length - 1].payload.date,
          value: actions[actions.length - 1].payload.value,
          resolution: true
        }]
      }
    };

    const actual = actions.reduce(alarms, alarmingState);
    expect(actual).to.deep.equal(expected);
  });
});