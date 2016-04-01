const initialState = {
  duration: 2 * 60 * 1000,
  counter: 0,
  threshold: 1,
  triggered: false,
  alarming: false
};

const update = (state, reading, comparator) => {
  let { counter, threshold, duration, alarming } = state;
  let triggered = false;

  if (comparator(reading.value, threshold)) {
    counter += reading.interval;
  }
  else {
    counter = 0;
  }

  if (counter >= duration) {
    triggered = true;
    counter = 0;
    alarming = !alarming;
  }

  return {
    ...state,
    counter,
    triggered,
    alarming
  };
};

const nonAlarmingFunc = (a, b) => a > b;
const alarmingFunc = (a, b) => a < b;

export default (state = initialState, action) => {
  switch (action.type) {
    case 'READING_RECEIVED':
      const comparatorFunc = state.alarming ? alarmingFunc : nonAlarmingFunc;
      return update(state, action.payload, comparatorFunc);

    default:
      return state;
  }
};

