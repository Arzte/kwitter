import { connect } from "react-redux";
import { getUsers } from "../../redux/users";
import React, { Component } from "react";
import { userIsAuthenticated } from "../HOCs";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Menu from "./Menu";
import "./Messages.css";
import { domain } from "../../redux/helpers";
import AccountCircleSharpIcon from '@material-ui/icons/AccountCircleSharp';

class UserList extends Component {
  componentDidMount() {
    this.props.getUsers();
  }
  handleDelete = (event, key) => {};

  render() {
    if (this.props.users === null) {
      return <div></div>;
    } else {
        let domain = "https://kwitter-api.herokuapp.com" 
      return (
        <div className="wrapper">
          <Card variant="outlined" className="card">
            <CardContent>
              <p className="friends"><h1>Friend List</h1></p>
            </CardContent>
          </Card>
          {this.props.users.map(user => (
            <Card variant="outlined" className="card" key={Math.random()}>
              <CardContent>
                {user.pictureLocation !== null &&
                <div><img src={domain + user.pictureLocation} ></img></div>
    }           {user.pictureLocation === null &&
                    <div><AccountCircleSharpIcon className="profileIcon" /></div>}
                <div className="displayName">{user.displayName}</div>
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
    users: state.users.getUsers.result,
    getUser: state.getaUser.getaUser.result,

  };
};

export default userIsAuthenticated(
  connect(mapStateToProps, {
    getUsers
  })(UserList)
);
