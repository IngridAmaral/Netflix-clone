import { CREATE_LOCAL_STORAGE, CREATE_USER, GET_ITEM_LOCAL_STORAGE } from '../actionTypes';

export const createLocalStorage = (key) => ({
  type: CREATE_LOCAL_STORAGE,
  payload: {
    key,
  },
});

export const addUser = (newUser) => ({
  type: CREATE_USER,
  payload: {
    newUser,
  },
});

export const getLocalStorage = (key) => ({
  type: GET_ITEM_LOCAL_STORAGE,
  payload: {
    key,
  },
});
