export function pushOneReading() {
  return {
    type: 'READING_RECEIVED',
    payload: {
      id: 'one',
      date: Date.now(),
      value: Math.random() * 10,
      interval: 120000 - 1
    }
  };
}

export function pushTwoReading() {
  return {
    type: 'READING_RECEIVED',
    payload: {
      id: 'two',
      date: Date.now(),
      value: Math.random() * 10,
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
