import loadAlarm from './loadAlarm';

/*
  Manages the state of each alarm and generates events based on their next state
  alarming | triggered
  00 -> no event
  01 -> alarm resolution event
  10 -> no event
  11 -> alarm trigger event
 */

const initialState = {
  loadAlarms: {}, // The current state of each alarm - return value of loadAlarm reducer mapped to alarm id
  loadAlarmEvents: {}
};

// Calulate the next state of the loadAlarm
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
      resolution: !nextAlarmState.alarming // When alarming is true, the alarm is entering the resolution state
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

// Alarms are always added in the order of start, end, start, end...
// So grouping by two is enough to associate readings from the same alarming period
function groupLoadAlarmEvents(events) {
  const groupedEvents = [];
  for (let i = 0; i < events.length; i += 2) {
    groupedEvents.push({
      triggered: events[i],
      resolved: events[i + 1]
    });
  }

  return groupedEvents;
}

export function getLoadAlarmEvents(state) {
  const events = {};
  for (const key of Object.keys(state.alarms.loadAlarmEvents)) {
    events[key] = groupLoadAlarmEvents(state.alarms.loadAlarmEvents[key]);
  }

  return events;
}
