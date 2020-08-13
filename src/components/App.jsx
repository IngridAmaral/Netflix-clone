import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
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
      <HashRouter>
        <div className="app_container">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" component={Login} />
            <Route
              path="/signup"
              render={(props) => <Login {...props} signup />}
            />
            <PrivateRoute path="/browse" component={BrowsePage} />
            <PrivateRoute path="/mostrecent" component={BrowsePage} page="getTrending" />
            <PrivateRoute path="/movies" component={BrowsePage} page="getAllMovies" />
            <PrivateRoute path="/series" component={BrowsePage} page="getSeries" />
            <PrivateRoute path="/mylist" component={BrowsePage} page="getMyList" />
            <Route path="*" />
          </Switch>
        </div>
      </HashRouter>
    );
  }
}

export default connect()(App);
