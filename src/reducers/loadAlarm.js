const initialState = {
  duration: 2 * 60 * 1000,
  counter: 0,
  threshold: 1,
  alarming: false,
  messages: []
};

const update = (state, reading) => {
  let { triggeredOn, resolvedOn, counter, alarming } = state;

  if (alarming) {
    if (reading.value < state.threshold) {
      counter += reading.interval;
    }
    else {
      counter = 0;
    }
  }
  else {
    if (reading.value > state.threshold) {
      counter += reading.interval;
    }
    else {
      counter = 0;
    }
  }

  if (counter >= state.duration) {
    if (alarming) {
      resolvedOn.push(reading.date);
    }
    else {
      triggeredOn.push(reading.date);
    }
    alarming = !alarming;
    counter = 0;
  }

  return {
    ...state,
    counter,
    alarming,
    triggeredOn,
    resolvedOn
  };
};


export default (state = initialState, action) => {
  switch (action.type) {
    case 'READING_RECEIVED':
      return update(state, action.reading);


    default:
      return state;
  }
};

