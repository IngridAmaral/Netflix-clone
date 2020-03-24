import React from 'react';
import Trial from './homepage/Trial';
import './App.css';
import Content from './homepage/Content/Content';
import Questions from './homepage/Questions/Questions';
import Footer from '../components/homepage/Footer/Footer';

class App extends React.Component {
    render() {
        return (
            <div className='app_container'>
                <Trial />
                <Content />
                <Questions />
                <Footer />
            </div>
        )
    }
}

export default App;