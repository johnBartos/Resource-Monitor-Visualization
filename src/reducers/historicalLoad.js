const initialState = {
  threshold: 10 * 60 * 1000, // The range of readings we're collecting in ms - 10 minutes
  readings: {}
};

// We don't have a lot of readings so we can filter on each action without a large performance hit
const pruneReadings = (readings, cutoff) => {
  const cutoffDate = Date.now() - cutoff;
  return readings.filter(e => e.date >= cutoffDate);
};

const updateReadings = (state, payload) => {
  const readings = state.readings[payload.id] ? state.readings[payload.id].slice() : [];
  readings.push({
    date: payload.date,
    value: payload.value
  });
  return readings;
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'READING_RECEIVED':
      const nextReadings = pruneReadings(updateReadings(state, action.payload), state.threshold);
      return {
        ...state,
        readings: {
          ...state.readings,
          [action.payload.id]: nextReadings
        }
      };

    default:
      return state;
  }
};




