import { api } from '../../../../Api';
import { GET_GENRES } from '../actionTypes/types';


export const fetchGenres = () => async () => {
  const response = await api.get('genre/movie/list?language=en-US')
    .then((res) => (res.data.genres));
  return response;
};

export const fetchGenresAC = () => (dispatch) => dispatch({
  type: GET_GENRES,
  payload: fetchGenres(),
});
