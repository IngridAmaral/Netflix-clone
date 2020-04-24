
import { GET_GENRES } from '../actionTypes/types';

const initialState = {
  isPending: false,
  genres: [],
  error: null,
};

export function genresReducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_GENRES}_PENDING`:
      return { ...state, isPending: true };
    case `${GET_GENRES}_FULFILLED`:
      return {
        ...state,
        isPending: false,
        genres: action.payload,
      };
    case `${GET_GENRES}_REJECTED`:
      return {
        ...state,
        isPending: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export const getGenres = (state) => state.genres.genres;
export const getGenresPending = (state) => state.genres.isPending;
export const getGenresError = (state) => state.genres.error;
