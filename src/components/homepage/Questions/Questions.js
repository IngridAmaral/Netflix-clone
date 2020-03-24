import React from 'react';
import './Questions.css';
import Question from './Question';
import Form from '../Trial/Form'


class Questions extends React.Component{
    render() {
        return (
            <div className='questions_container'>
                <h1>Frequently Asked Questions</h1>
                <Question />
                <Form /> 
            </div>
        )
    }
}

export default Questions;