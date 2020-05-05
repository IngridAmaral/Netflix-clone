import React from 'react';
import './Questions.css';
import Question from './Question';
import Form from '../Trial/TrialForm';


const Questions = () => (
  <div className="questions_container">
    <h1>Frequently Asked Questions</h1>
    <Question />
    <Form />
  </div>
);


export default Questions;
