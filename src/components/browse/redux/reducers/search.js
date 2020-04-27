import { GET_SEARCH_RESULTS } from '../actionTypes/types';

const initialState = {
  isPending: false,
  results: [],
  error: null,
};

export function resultsReducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_SEARCH_RESULTS}_PENDING`:
      return { ...state, isPending: true };
    case `${GET_SEARCH_RESULTS}_FULFILLED`:
      return {
        ...state,
        isPending: false,
        results: action.payload,
      };
    case `${GET_SEARCH_RESULTS}_REJECTED`:
      return {
        ...state,
        isPending: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export const getResults = (state) => state.results.results;
export const getResultsPending = (state) => state.results.isPending;
export const getResultsError = (state) => state.results.error;
