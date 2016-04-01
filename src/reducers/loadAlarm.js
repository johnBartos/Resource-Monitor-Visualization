const initialState = {
  duration: 2 * 60 * 1000,
  counter: 0,
  threshold: 1,
  triggered: false,
  message: undefined
};

const update = (state, reading) => {
  let { counter, threshold, duration } = state;
  let triggered = false;

  if (reading.value > threshold) {
    counter += reading.interval;
  }
  else {
    counter = 0;
  }

  if (counter >= duration) {
    triggered = true;
    counter = 0;
  }

  return {
    ...state,
    counter,
    triggered
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

