import React, { Component } from "react";
import { getUser } from "../../redux/users";
import { connect } from "react-redux";
import { userIsAuthenticated } from "../HOCs";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import "./MyProfile.css";
import PostMessage from "./PostMessage";
import { withRouter } from "react-router";

class MyProfile extends Component {
  componentDidMount() {
    this.props.getUser(this.props.match.params.username);
  }
  render() {
    if (this.props.getUserRes === null) {
      return <div></div>;
    } else {
      let apiUrl = "https://kwitter-api.herokuapp.com";
      console.log(this.props.getUserRes);

      return (
        <div className="wrapper1">
          <Card className="card">
            <CardContent>
              <div className="pic">
                <img
                  src={apiUrl + this.props.getUserRes.user.pictureLocation}
                  alt={
                    this.props.getUserRes.user.displayName +
                    "'s profile picture"
                  }
                ></img>
              </div>

              <div className="displayName">
                {this.props.getUserRes.user.displayName}
              </div>
              <div className="userName">
                {this.props.getUserRes.user.username}
              </div>
              <div className="about">{this.props.getUserRes.user.about}</div>
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
    getUserRes: state.users.getUser.result
  };
};

export default userIsAuthenticated(
  connect(mapStateToProps, {
    getUser
  })(withRouter(MyProfile))
);
