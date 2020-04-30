import { api } from '../../../../Api';
import { GET_SERIES } from '../actionTypes/types';


export const fetchSeries = () => async () => {
  const current = ['discover/tv', 'tv/airing_today', 'tv/on_the_air', 'tv/popular', 'tv/top_rated'];
  const id = ['Discover', 'Airinng Today', 'On the air', 'Popular Series', 'Top rated Series'];
  const responsePromise = current.map(
    (path, idx) => api.get(`${path}?page=${idx + 1}`).then((res) => ({ title: id[idx], movies: [...res.data.results] })),
  );
  const response = await Promise.all(responsePromise);
  return response;
};

export const fetchSeriesAC = () => (dispatch) => dispatch({
  type: GET_SERIES,
  payload: fetchSeries(),
});
