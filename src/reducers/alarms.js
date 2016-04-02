import loadAlarm from './loadAlarm';

const initialState = {
  loadAlarms: {},
  loadAlarmEvents: {}
};

const updateAlarm = (state, action) => {
  const lastAlarmState = state.loadAlarms[action.payload.id];
  return loadAlarm(lastAlarmState, action);
};

const addAlarmEvents = (state, nextAlarmState, payload) => {
  const alarms = state.loadAlarmEvents[payload.id].slice();
  if (nextAlarmState.triggered) {
    alarms.push({
      date: payload.date,
      value: payload.value,
      resolution: !nextAlarmState.alarming
    });
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
          [action.payload.id]: loadAlarm(undefined, {})
        },
        loadAlarmEvents: {
          ...state.loadAlarmEvents,
          [action.payload.id]: []
        }
      };

    case 'READING_RECEIVED':
      const { id } = action.payload;
      if (!state.loadAlarms[id]) {
        return state;
      }

      const nextAlarmState = updateAlarm(state, action);
      const alarms = addAlarmEvents(state, nextAlarmState, action.payload);

      return {
        ...state,
        loadAlarms: {
          ...state.loadAlarms,
          [id]: nextAlarmState
        },
        loadAlarmEvents: {
          ...state.loadAlarmEvents,
          [id]: alarms
        }
      };

    default:
      return state;
  }
};
