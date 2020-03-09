import React from "react";
import { Menu } from "./components";
import { userIsAuthenticated } from "./HOCs";
import PostMessage from './components/PostMessage'
class Profile extends React.Component {
  render() {
    return (
      <>
        <Menu isAuthenticated={this.props.isAuthenticated} />
        <h2>Profile</h2>
        <PostMessage />
      </>
    );
  }
}

export default userIsAuthenticated(Profile);
