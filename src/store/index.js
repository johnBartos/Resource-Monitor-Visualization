import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import rootReducer from '../reducers/';

const middlewares = [createLogger()];

export default function configureStore() {
  return createStore(
    rootReducer,
    applyMiddleware(...middlewares)
  );
}
