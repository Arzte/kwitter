import React from "react";
import { Menu } from "./components";
import { userIsAuthenticated } from "./HOCs";

const GET_USER_URL = "https://kwitter-api.herokuapp.com/users/test-awesome"
const GET_USER_PHOTO = "https://kwitter-api.herokuapp.com/users/test-awesome/picture$"



class Profile extends React.Component {
  state = {
    user: [],
    photo: []
  };
  

  componentDidMount() {
    fetch(GET_USER_URL)
    .then(response => response.json())
    .then(json => {
      console.log(json)
      this.setState({ ...this.state, user: json.user })
    })
  }  
  componentDidMountAgain() {
    fetch(GET_USER_PHOTO)
    .then(response => response.json())
   .then(json => {
     this.setState({ ...this.state, photo: json })
    })
  }
  render() {
    console.log(this.state)
    return (
      <>
        <Menu isAuthenticated={this.props.isAuthenticated} />
        <h2>Profile</h2> 
        
          <div>
           name: {this.state.user.username}
           pictureLocation: {this.state.user.pictureLocation}
           displayName: {this.state.user.displayName}
           about: {this.state.user.about}
           googleId: {this.state.user.googleId}
           createdAt: {this.state.user.createdAt}
           updated: {this.state.user.updatedAt} 
          </div>
        
         { this.state.photo.map(photo => (
          <div>
            message: {photo.message}

          </div>
         ))} 
    </>
    
    );
  }
}

export default userIsAuthenticated(Profile);
