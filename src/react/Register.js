import React from "react";
import { Menu, RegisterForm } from "./components";
import { userIsNotAuthenticated } from "./HOCs";
import "./Home.css";

class Register extends React.Component {
  render() {
    return (
      <>
        <Menu />
        <div className="font">
          <h2>Your favorite microblogging platform</h2>
        </div>
        <RegisterForm />
      </>
    );
  }
}

export default userIsNotAuthenticated(Register);
