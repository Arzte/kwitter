import React from "react";
import "./App.css";
import Root from "./compontents/Root";
import { connect } from "react-redux";
import { Route } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Route path="/" render={() => <Root />} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(App);
