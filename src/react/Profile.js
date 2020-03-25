import React from "react";
import { Menu } from "./components";
import { userIsAuthenticated } from "./HOCs";
import PostMessage from "./components/PostMessage";
import {  UPDATEUSER } from "../../redux/UPDATEUSER.js";
import { USERPIC } from "../../USERPIC.js";
import { DELETEUSER } from "../../DELETEUSER.js";
import { CREATEUSER } from "../../users.js";
import { connect } from "react-redux";

 const GET_USER_URL = "https://kwitter-api.herokuapp.com/users/usernameusername";
const GET_USER_PHOTO =
  "https://kwitter-api.herokuapp.com/users/usernameusername/picture$";

class Profile extends React.Component {
  
  componentDidMount() {
    this.props.UPDATEUSER();
    
    this.props.USERPIC();
    
    this.props.DELETEUSER();

    this.props.CREATEUSER();
    
    
    
    [fetch(GET_USER_URL), fetch(GET_USER_PHOTO)]
      .then(response => response.json())
      .then(json => {
          this.setState({ ...this.state, user: json.user });
        });
    }
    
    render() {
      return (
        <div>
        <Menu isAuthenticated={this.props.isAuthenticated} />
        <h2>Profile</h2>

        <div>
          "pictureLocation": "/users/usernameusername/picture?t=1584643531391",
          "username": "usernameusername", 
          "displayName": "iReallyHateItHere",
          "about": "", 
          "googleId": null, 
          "createdAt": "2020-03-19T18:42:29.409Z", 
          "updatedAt": "2020-03-19T18:45:31.391Z"
        </div>

        {this.state.photo.map(photo => (
          <div>message: {photo.message}</div>
          ))}
        <PostMessage />
      </div>
    );
    
  }
}
        const mapStateToProps = state => {
          return {
          updateuser: state.auth.updateuser,
          setcurrentphoto: state.auth.userpic,
          delete: state.auth.deleteuser 
          }
        };

export default userIsAuthenticated(connect(mapStateToProps, {
  DELETEUSER,
  UPDATEUSER,
  USERPIC,
  CREATEUSER
})(Profile));
