import loadGenerator from '../utils/loadGenerator';

const batchActions = (...actions) => {
  return {
    type: 'BATCH_ACTIONS',
    actions
  };
};

const makeLoadReading = (id, date, value) => {
  return {
    type: 'READING_RECEIVED',
    payload: {
      id,
      date,
      value,
      interval: 10 * 1000
    }
  };
};

export function getSystemLoad() {
  const load = loadGenerator.next().value;
  const now = Date.now();
  return batchActions(
    makeLoadReading('one', now, load.one),
    makeLoadReading('five', now, load.five),
    makeLoadReading('fifteen', now, load.fifteen)
  );
}

export function addLoadAlarm(id) {
  return {
    type: 'LOAD_ALARM_ADDED',
    payload: {
      id
    }
  };
}
