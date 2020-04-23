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

export const getMovies = async (current, num = '') => {
  let path;
  let page = num;
  if (current === 'browse') {
    path = 'movie/upcoming';
    page = '&page=2';
  } else if (current === 'series') {
    path = 'tv/top_rated';
  } else if (current === 'movies') {
    path = 'movie/popular';
  } else if (current === 'mostrecent') {
    path = 'trending/all/day';
  } else {
    path = current;
    page = '&page=3';
  }

  const resp = await api.get(
    `${path}?api_key=${API_KEY}${page}`,
  );
  return resp;
};

export const getMovie = () => {
  const current = ['movie/upcoming', 'trending/all/day', 'movie/now_playing', 'movie/popular'];
  const resp = current.map(
    async (path, idx) => api.get(
      `${path}?api_key=${API_KEY}&page=${idx + 1}`,
    ).then((response) => response.data.results),
  );

  return resp;
};

export const getSeries = () => {
  const current = ['discover/tv', 'tv/airing_today', 'tv/on_the_air', 'tv/popular', 'tv/top_rated'];
  const resp = current.map(
    async (path) => api.get(
      `${path}?api_key=${API_KEY}`,
    ).then((response) => response.data.results),
  );

  return resp;
};

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

export const getGenres = async () => {
  const resp = await api.get(
    `genre/movie/list?api_key=${API_KEY}&language=en-US`,
  );
  return resp;
};
