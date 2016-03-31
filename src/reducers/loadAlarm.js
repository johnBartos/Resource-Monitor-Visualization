const initialState = {
  duration: 2 * 60 * 1000,
  valueThreshold: 1,
  current: undefined,
  alarming: false
};



export default (state = initialState, action) => {
  switch (action.type) {
    case 'READING_RECEIVED':
      if (state.current) {
        if (action.value > threshold) {
          if (action.date)
        }
      }
    default:
      return state;
  }
};

