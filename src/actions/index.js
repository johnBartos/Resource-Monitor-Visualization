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
      value
    }
  };
};

const makeLoadAlarm = id => {
  return {
    type: 'LOAD_ALARM_ADDED',
    payload: {
      id
    }
  };
};

// Batching allows the reducers to handle several actions and push just one state
// I use batching so I don't have to do a ton of looping in the reducers
export function getSystemLoad() {
  const load = loadGenerator.next().value;
  const now = Date.now();
  return batchActions(
    makeLoadReading('one', now, load.one),
    makeLoadReading('five', now, load.five),
    makeLoadReading('fifteen', now, load.fifteen)
  );
}

export function addLoadAlarms(...ids) {
  const actions = ids.map(e => makeLoadAlarm(e));
  return batchActions(...actions);
}
