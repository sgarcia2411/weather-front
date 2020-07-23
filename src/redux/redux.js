import { combineReducers, createStore } from 'redux';
import * as citiesReducers from './cities.duck';

const rootReducer = combineReducers(citiesReducers);

export const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
