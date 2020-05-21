import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { createLocalStorage, getLocalStorage } from './login/redux/actions/login';
import PrivateRoute from './login/PrivateRoute';
import './App.css';

import Login from './login/Login';
import BrowsePage from './browse/BrowsePage';
import Home from './homepage/Home';

class App extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;

    if (!window.localStorage.getItem('users')) {
      dispatch(createLocalStorage('users'));
    } else {
      dispatch(getLocalStorage('users'));
    }
  }

  render() {
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
            <PrivateRoute path="/browse" component={BrowsePage} />
            <PrivateRoute path="/mostrecent" render={(props) => <BrowsePage {...props} page="getTrending" />} />
            <PrivateRoute path="/movies" render={(props) => <BrowsePage {...props} page="getAllMovies" />} />
            <PrivateRoute path="/series" render={(props) => <BrowsePage {...props} page="getSeries" />} />
            <PrivateRoute path="/mylist" render={(props) => <BrowsePage {...props} page="getMyList" />} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default connect()(App);
