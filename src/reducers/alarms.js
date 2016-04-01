import loadAlarm from './loadAlarm';

const initialState = {
  loadAlarms: {},
  loadAlarmEvents: {}
};

const updateLoadAlarmStates = (state, action) => {
  const { loadAlarms } = state;
  const nextAlarmStates = {};

  for (const id of Object.keys(loadAlarms)) {
    const reading = action.readings[id];
    if (typeof reading !== 'undefined') {
      nextAlarmStates[id] = loadAlarm(loadAlarms[id], {
        type: 'READING_RECEIVED',
        date: reading.date,
        value: reading.value
      });
    }
  }

  return nextAlarmStates;
};

const gatherLoadAlarms = (loadAlarms) => {
  const alarmEvents = {};

  for (const id of Object.keys(loadAlarms)) {
    const alarm = loadAlarms[id];
    if (alarm.triggered) {
      alarmEvents[id] = alarm.message;
    }
  }

  return alarmEvents;
};

const resetAlarm = () => {
  return loadAlarm(undefined, {});
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
      const nextLoadAlarmStates = updateLoadAlarmStates(state, action);
      const nextLoadAlarmEvents = gatherLoadAlarms(nextLoadAlarmStates);

      for (const id of Object.keys(nextLoadAlarmEvents)) {
        nextLoadAlarmStates[id] = resetAlarm();
      }

      return {
        ...state,
        loadAlarms: { ...nextLoadAlarmStates },
        alarmEvents: {
          ...state.loadAlarmEvents,
          ...nextLoadAlarmEvents
        }
      };

    default:
      return state;
  }
};
