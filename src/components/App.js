import React from 'react';
import Trial from './homepage/Trial';
import './App.css';
import Content from './homepage/Content/Content';
import Questions from './homepage/Questions/Questions';


class App extends React.Component {
    render() {
        return (
            <div className='app_container'>
                <Trial />
                <Content />
                <Questions />
            </div>
        )
    }
}

export default App;