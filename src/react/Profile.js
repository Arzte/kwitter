import React from "react";
import { Menu } from "./components";
import { userIsAuthenticated } from "./HOCs";
import UserList from "./components/UserList";
import MyProfile from "./components/MyProfile";
import "./Profile.css";

class Profile extends React.Component {
  render() {
    return (
      <>
        <Menu isAuthenticated={this.props.isAuthenticated} />
        <h1>Profile</h1>
        <div className="wrapper2">
          <div className="profileSide">
            <MyProfile />
          </div>
          <div className="userSide">
            <UserList />
          </div>
        </div>
      </>
    );
  }
}

export default userIsAuthenticated(Profile);
