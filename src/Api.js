/* eslint-disable import/prefer-default-export */
import axios from 'axios';

const API_KEY = process.env.REACT_APP_API_KEY;
const ROOT_URL = 'https://api.themoviedb.org/3/';
const makeAxiosInstance = () => {
  const instance = axios.create({ baseURL: ROOT_URL });

  instance.interceptors.request.use((config) => ({
    ...config,
    params: {
      api_key: API_KEY,
      ...config.params,
    },
  }));

  return instance;
};
export const api = makeAxiosInstance();


export const findMovie = async (text) => {
  const encoded = encodeURI(text);

  const resp = await api.get(
    `search/movie?api_key=${API_KEY}&query=${encoded}&include_adult=false`,
  );
  return resp;
};

export const findSeries = async (text) => {
  const encoded = encodeURI(text);

  const resp = await api.get(
    `search/tv?api_key=${API_KEY}&query=${encoded}&language=en-US&include_adult=false`,
  );
  return resp;
};
