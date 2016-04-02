import { combineReducers } from 'redux';
import alarms from './alarms';
import historicalLoad from './historicalLoad';

export default combineReducers({
  alarms,
  historicalLoad
});

