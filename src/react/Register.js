import React from "react";
import { Menu, RegisterForm } from "./components";
import { userIsNotAuthenticated } from "./HOCs";

class Register extends React.Component {
  render() {
    return (
      <>
        <Menu />
        <h2>Your favorite microblogging platform</h2>
        <RegisterForm />
      </>
    );
  }
}

export default userIsNotAuthenticated(Register);
