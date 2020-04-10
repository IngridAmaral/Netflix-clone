import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';

import Login from './login/Login';
import BrowsePage from './browse/BrowsePage';
import Home from './homepage/Home';

const App = () => (
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

export default App;
