import loadAlarm from './loadAlarm';

const initialState = {
  loadAlarms: {},
  loadAlarmEvents: {}
};

const updateAlarm = (state, action) => {
  const lastAlarmState = state.loadAlarms[action.payload.id];
  if (!lastAlarmState) {
    return;
  }
  return loadAlarm(lastAlarmState, action);
};

const addAlarmEvents = (state, nextAlarmState, payload) => {
  let alarms = state.loadAlarmEvents[payload.id] ? state.loadAlarmEvents[payload.id].slice() : [];
  if (nextAlarmState.triggered) {
    alarms.push('Triggered on ' + payload.date);
  }
  return alarms;
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'LOAD_ALARM_ADDED':
      return {
        ...state,
        loadAlarms: {
          ...state.loadAlarms,
          [action.id]: loadAlarm(undefined, {})
        }
      };

    case 'READING_RECEIVED':
      let nextAlarmState = updateAlarm(state, action);
      if (!nextAlarmState) {
        return state;
      }
      const alarms = addAlarmEvents(state, nextAlarmState, action.payload);

      if (nextAlarmState.triggered) {
        nextAlarmState = loadAlarm(undefined, {});
      }

      return {
        ...state,
        loadAlarms: {
          ...state.loadAlarms,
          [action.id]: nextAlarmState
        },
        alarmEvents: {
          ...state.alarmEvents,
          [action.id]: alarms
        }
      };

    default:
      return state;
  }
};