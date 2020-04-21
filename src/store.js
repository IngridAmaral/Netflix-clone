import { createStore, combineReducers } from 'redux';
import openAswer from './components/homepage/Redux/reducers/homepage';
import { manageStorage } from './components/login/Redux/reducers/login';

const rootReducer = combineReducers({ openAswer, manageStorage });

export const store = createStore(rootReducer);
