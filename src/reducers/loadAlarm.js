/*
A reducer which calculates the state of the alarm
Not directly part of the state tree, but invoked by the alarms reducer
NOTE: The soonest a resolution to an alarm can occur is 10s (one interval) after the trigger
*/

const initialState = {
  duration: 2 * 60 * 1000, // The duration to trigger a new alarm state in ms
  tolerance: 1000, // Sometimes the request arrives too early (setInterval() isn't exact), add a ms tolerance so we don't miss it
  startDate: undefined, // The start of the current streak of readings which pass the threshold
  threshold: 1,
  triggered: false, // A flag to signal when the alarm has been triggered. Checked by the alarms reducer
  alarming: false // False: alarm has yet to be triggered. True: alarm is waiting to be resolved
};

const update = (state, reading, comparator) => {
  let { threshold, duration, alarming, startDate } = state;
  let triggered = false;

  // Only want to reset if the streak has been broken in a previous state
  if (comparator(reading.value, threshold)) {
    startDate = typeof startDate === 'undefined' ? reading.date : startDate;
  }
  else {
    startDate = undefined;
  }

  // Toggle the alarm state if we've exceeded the duration
  // Need to make sure startDate is reset immediately following a toggle of the alarm state
  // Or else the next streak will trigger 10s too early
  if (startDate && (reading.date - startDate >= duration + 10 || reading.date - startDate >= duration - 10)) {
    triggered = true;
    startDate = undefined;
    alarming = !alarming;
  }

  return {
    ...state,
    startDate,
    triggered,
    alarming
  };
};

const nonAlarmingFunc = (a, b) => a > b;
const alarmingFunc = (a, b) => a < b;

export default (state = initialState, action) => {
  switch (action.type) {
    case 'READING_RECEIVED':
      // If we're alarming (i.e. looking for the resolution), need to check if the value is under the threshold
      const comparatorFunc = state.alarming ? alarmingFunc : nonAlarmingFunc;
      return update(state, action.payload, comparatorFunc);

    default:
      return state;
  }
};

