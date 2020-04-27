import { api } from '../../../../Api';
import { GET_SEARCH_RESULTS } from '../actionTypes/types';


export const fetchResults = (input) => async () => {
  const encoded = encodeURI(input);
  const responseMovies = await api.get(`search/movie?&query=${encoded}&include_adult=false`)
    .then((res) => (res.data.results));
  const responseSeries = await api.get(`search/tv?&query=${encoded}&include_adult=false`)
    .then((res) => (res.data.results));
  return [...responseMovies, ...responseSeries];
};

export const fetchResultsAC = (input) => (dispatch) => dispatch({
  type: GET_SEARCH_RESULTS,
  payload: fetchResults(input),
});
