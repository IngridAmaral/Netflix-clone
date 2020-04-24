
import { GET_SERIES } from '../actionTypes/types';

const initialState = {
  isPending: false,
  series: [],
  error: null,
};

export function seriesReducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_SERIES}_PENDING`:
      return { ...state, isPending: true };
    case `${GET_SERIES}_FULFILLED`:
      return {
        ...state,
        isPending: false,
        series: action.payload,
      };
    case `${GET_SERIES}_REJECTED`:
      return {
        ...state,
        isPending: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export const getSeries = (state) => state.series.series;
export const getSeriesPending = (state) => state.series.isPending;
export const getSeriesError = (state) => state.series.error;
