/* eslint-disable import/prefer-default-export */
import { QUESTION_CLICKED } from '../actionTypes/homepage';

export const questionClicked = (clicked, number) => ({
  type: QUESTION_CLICKED,
  payload: {
    clicked,
    number,
  },
});
