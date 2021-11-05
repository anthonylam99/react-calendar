import React from "react";

import Calendar from "./components/Calendar";
import Login from "./components/Login";
import "./App.css";
import { Redirect, Route, Router, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";

import { connect } from "react-redux";

const App = ({isAuthenticated}) => {
  return (
    <div className="App">
      <header>
        <div id="logo">
          <span className="icon">date_range</span>
          <span>
            react<b>calendar</b>
          </span>
        </div>
      </header>
      <main>
        <BrowserRouter>
          {!isAuthenticated ? (
            <Switch>
              <Route exact path="/login" component={Login} />
              <Redirect to="/login" />
            </Switch>
          ) : (
            <Switch>
              <Route exact path="/" component={Calendar} />
              <Redirect to="/" />
            </Switch>
          )}
        </BrowserRouter>
      </main>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.login.isAuthenticated,
  };
};

export default connect(mapStateToProps)(App);
//
