import React from "react";
import { Menu } from "./components";
import { userIsAuthenticated } from "./HOCs";
import PostMessage from "./components/PostMessage";
import {  updateuser } from "../redux/UPDATEUSER.js";
import { userpic } from "../redux/USERPIC.js";
import { deleteuser } from "../redux/DELETEUSER.js";
import { createuser } from "../redux/users.js";
import { connect } from "react-redux";

 const GET_USER_URL = "https://kwitter-api.herokuapp.com/users/usernameusername";
const GET_USER_PHOTO =
  "https://kwitter-api.herokuapp.com/users/usernameusername/picture$";

class Profile extends React.Component {
  
  componentDidMount() {
    this.props.updateuser();
    
    this.props.userpic();
    
    this.props.deleteuser();

    this.props.createuser();
    
    
    
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
          updateuser: state.auth.updateuser.result,
          setcurrentphoto: state.auth.userpic.result,
          delete: state.auth.deleteuser.result 
          }
        };

export default userIsAuthenticated(connect(mapStateToProps, {
  deleteuser,
  updateuser,
  userpic,
  createuser
})(Profile));
