import React from 'react';
import Trial from './homepage/Trial';
import './App.css';
import Content from './homepage/Content/Content';

class App extends React.Component {
    render() {
        return (
            <div className='app_container'>
                <Trial />
                <Content />
            </div>
        )
    }
}

export default App;