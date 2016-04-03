import { combineReducers } from 'redux';
import alarms from './alarms';
import historicalLoad from './historicalLoad';
import enableBatching from './enableBatching';

export default combineReducers({
  alarms: enableBatching(alarms),
  historicalLoad: enableBatching(historicalLoad)
});


export { getLoadAlarmEvents } from '../reducers/alarms';

