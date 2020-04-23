
import { GET_MOVIES } from '../actionTypes/types';

const initialState = {
  isPending: false,
  movies: [],
  error: null,
};

export function moviesReducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_MOVIES}_PENDING`:
      return { ...state, isPending: true };
    case `${GET_MOVIES}_FULFILLED`:
      return {
        ...state,
        isPending: false,
        movies: action.payload,
      };
    case `${GET_MOVIES}_REJECTED`:
      return {
        ...state,
        isPending: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export const getMovies = (state) => state.movies.movies;
export const getMoviesPending = (state) => state.movies.isPending;
export const getMoviesError = (state) => state.movies.error;
