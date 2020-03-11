import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import Register from "./Register";
import Profile from "./Profile";
import NotFound from "./NotFound";
import Messages from "./components/Messages"

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/profiles/:username" component={Profile} />
        <Route exact path="/messagefeed/" component={Messages} />
        <Route path="*" component={NotFound} />
      </Switch>
    );
  }
}

export default App;
