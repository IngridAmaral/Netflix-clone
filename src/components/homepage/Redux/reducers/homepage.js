import { QUESTION_CLICKED } from '../actionTypes/homepage';

export default function openAnswer(state = { clicked: false, number: null }, action) {
  switch (action.type) {
    case QUESTION_CLICKED:
      return { ...state, clicked: action.payload.clicked, number: action.payload.number };
    default:
      return state;
  }
}
