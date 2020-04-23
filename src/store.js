import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import { manageStorage } from './components/login/redux/reducers/login';
import { moviesReducer } from './components/browse/redux/reducers/movies';


const rootReducers = combineReducers({
  movies: moviesReducer,
  manageStorage,
});
const middlewares = [thunk, promise];

export const store = createStore(rootReducers, applyMiddleware(...middlewares));
