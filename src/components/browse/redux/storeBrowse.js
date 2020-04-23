/* eslint-disable import/prefer-default-export */
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { moviesUpcomingReducer } from './reducers/moviesUpcoming';

const rootReducers = combineReducers({ moviesUpcomingReducer });
const middlewares = [thunk];

export const storeBrowse = createStore(rootReducers, applyMiddleware(...middlewares));
