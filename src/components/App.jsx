import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

import Trial from './homepage/Trial';
import Content from './homepage/Content/Content';
import Questions from './homepage/Questions/Questions';
import Footer from './homepage/Footer/Footer';
import Login from './login/Login';
import BrowsePage from './browse/BrowsePage';

const Home = () => (
  <div className="app_container">
    <Trial />
    <Content />
    <Questions />
    <Footer />
  </div>
);

const App = () => {
  return (
    <Router>
      <div className="app_container">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route
            path="/signup"
            render={(props) => <Login {...props} signup />}
          />
          <Route path="/browse" component={BrowsePage} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
