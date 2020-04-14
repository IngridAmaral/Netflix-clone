/* eslint-disable import/prefer-default-export */
import axios from 'axios';

const API_KEY = process.env.REACT_APP_API_KEY;
const ROOT_URL = 'https://api.themoviedb.org/3/';
const api = axios.create({ baseURL: ROOT_URL });

export const getMovies = async (current, num = '') => {
  let path;
  let page = num;
  if (current === 'browse') {
    path = 'movie/upcoming';
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
