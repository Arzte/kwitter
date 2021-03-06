import { connect } from "react-redux";
import { getUsers } from "../../redux/users";
import React, { Component } from "react";
import { userIsAuthenticated } from "../HOCs";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import "./Messages.css";
import "./UserList.css";
import AccountCircleSharpIcon from "@material-ui/icons/AccountCircleSharp";
import { Link } from "@material-ui/core";

class UserList extends Component {
  componentDidMount() {
    this.props.getUsers();
  }
  handleDelete = (event, key) => {};

  render() {
    if (this.props.users === null) {
      return <div></div>;
    } else {
      let apiUrl = "https://kwitter-api.herokuapp.com";
      return (
        <div className="wrapper">
          <Card variant="outlined" className="card">
            <CardContent>
              <div className="friends">
                <h1>Friend List</h1>
              </div>
            </CardContent>
          </Card>
          {this.props.users.map(user => (
            <Card variant="outlined" className="card" key={Math.random()}>
              <CardContent>
                {user.pictureLocation !== null && (
                  <div>
                    <img
                      className="profilePic"
                      src={apiUrl + user.pictureLocation}
                      alt={user.displayName + "'s profile picture"}
                    />
                  </div>
                )}{" "}
                {user.pictureLocation === null && (
                  <div>
                    <AccountCircleSharpIcon
                      className="profileIcon"
                      fontSize="large"
                    />
                  </div>
                )}
                <div className="displayName">
                  <Link href={"/profiles/" + user.username}>
                    {user.displayName}
                  </Link>
                </div>
                <div className="userName">{user.username}</div>
                <div className="aboutUser">{user.about}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    user: state.users.getUser.result,
    users: state.users.getUsers.result
  };
};

export default userIsAuthenticated(
  connect(mapStateToProps, {
    getUsers
  })(UserList)
);
