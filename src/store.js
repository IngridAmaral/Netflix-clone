import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import { manageStorage } from './components/login/redux/reducers/login';
import { moviesReducer } from './components/browse/redux/reducers/movies';
import { seriesReducer } from './components/browse/redux/reducers/series';
import { genresReducer } from './components/browse/redux/reducers/genres';


const rootReducers = combineReducers({
  movies: moviesReducer,
  series: seriesReducer,
  genres: genresReducer,
  manageStorage,
});
const middlewares = [thunk, promise];

export const store = createStore(rootReducers, applyMiddleware(...middlewares));
