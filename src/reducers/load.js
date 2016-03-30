const initialState = {
  threshold: 10 * 60 * 1000, // milliseconds
  readings: []
};

const pruneReadings = (readings, cutoff) => {
  const cutoffDate = Date.now() - cutoff;
  return readings.filter(e => e.date >= cutoffDate);
};


export default (state = initialState, action) => {
  switch (action.type) {
    case 'READING_RECEIVED':
      return {
        ...state,
        readings: pruneReadings([...state.readings, action.reading], state.threshold)
      };

    default:
      return state;
  }
};




