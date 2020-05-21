import { CREATE_LOCAL_STORAGE, CREATE_USER, GET_ITEM_LOCAL_STORAGE } from '../actionTypes';

export function manageStorage(state = {}, action) {
  const users = JSON.parse(window.localStorage.getItem('users'));

  switch (action.type) {
    case CREATE_LOCAL_STORAGE:
      window.localStorage.setItem('users', JSON.stringify({}));
      return state;

    case CREATE_USER:
      window.localStorage.setItem(
        'users',
        JSON.stringify({ ...users, ...action.payload.newUser }),
      );
      return { ...state, ...action.payload.newUser };

    case GET_ITEM_LOCAL_STORAGE:
      return { ...state, ...users };
    default:
      return state;
  }
}
