import React from "react";
import Trial from "./homepage/Trial";
import "./App.css";
import Content from "./homepage/Content/Content";
import Questions from "./homepage/Questions/Questions";
import Footer from "../components/homepage/Footer/Footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./login/Login";

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="app_container">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" render={props => <Login {...props} />} />
            <Route path="/signup" render={props => <Login {...props} signup />} />} />
          </Switch>
        </div>
      </Router>
    );
  }
}

const Home = () => {
    return (
        <div className="app_container">
          <Trial />
          <Content />
          <Questions />
          <Footer />
        </div>
    )
}

export default App;
