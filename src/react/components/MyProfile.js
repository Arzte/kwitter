import React, { Component } from "react";
import { getaUser } from "../../redux/getUser";
import { connect } from "react-redux";
import { userIsAuthenticated } from "../HOCs";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import "./MyProfile.css";
import PostMessage from "./PostMessage";
import { getaUserPic } from "../../redux/getUserPic";

class MyProfile extends Component {
  componentDidMount() {
    this.props.getaUser(this.props.user);
    this.props.getaUserPic(this.props.user);
  }
  render() {
    if (this.props.getUser === null) {
      return <div></div>;
    } else {
      let domain =
        "https://kwitter-api.herokuapp.com" +
        this.props.getUser.user.pictureLocation;

      return (
        <div className="wrapper1">
          <Card className="card">
            <CardContent>
              <div className="pic">
                <img
                  src={domain}
                  alt={
                    this.props.getUser.user.displayName + "'s profile picture"
                  }
                ></img>
              </div>

              <div className="displayName">
                {this.props.getUser.user.displayName}
              </div>
              <div className="userName">{this.props.getUser.user.username}</div>
              <div className="about">{this.props.getUser.user.about}</div>
            </CardContent>
            <PostMessage />
          </Card>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    messages: state.messages.getMessages.result,
    user: state.auth.login.result.username,
    getUser: state.getaUser.getaUser.result,
    getUserPic: state.getaUserPic.getaUserPic.result
  };
};

export default userIsAuthenticated(
  connect(mapStateToProps, {
    getaUser,
    getaUserPic
  })(MyProfile)
);
