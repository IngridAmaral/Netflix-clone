import { api } from '../../../../Api';
import { GET_MOVIES } from '../actionTypes/types';


export const fetchMovies = () => async () => {
  const current = ['movie/upcoming', 'trending/all/day', 'movie/now_playing', 'movie/popular', 'movie/top_rated'];
  const id = ['Upcoming', 'Trending all day', 'Now Playing', 'Popular', 'Top rated'];
  const responsePromise = current.map(
    (path, idx) => api.get(`${path}?page=${idx + 1}`).then((res) => ({ title: id[idx], movies: [...res.data.results] })),
  );
  const response = await Promise.all(responsePromise);
  return response;
};

export const fetchMoviesAC = () => (dispatch) => dispatch({
  type: GET_MOVIES,
  payload: fetchMovies(),
});
