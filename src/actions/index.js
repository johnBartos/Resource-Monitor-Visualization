export function pushOverReading() {
  return {
    type: 'READING_RECEIVED',
    payload: {
      id: 'one',
      date: Date.now(),
      value: 2,
      interval: 120000 - 1
    }
  };
}

export function pushUnderReading() {
  return {
    type: 'READING_RECEIVED',
    payload: {
      id: 'one',
      date: Date.now(),
      value: 0.5,
      interval: 120000 - 1
    }
  };
}

export function addLoadAlarm() {
  return {
    type: 'LOAD_ALARM_ADDED',
    payload: {
      id: 'one'
    }
  };
}
