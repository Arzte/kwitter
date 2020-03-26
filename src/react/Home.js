import React from "react";
import { LoginForm, Menu } from "./components";
import { userIsNotAuthenticated } from "./HOCs";
import { Link } from "react-router-dom";
import "./Home.css";
class Home extends React.Component {
  render() {
    return (
      <>
        <Menu />
        <div className="font">
          <h2>Your favorite microblogging platform</h2>
        </div>
        <LoginForm />
        <div className="font">
          <Link to="/register">Don't have an account? Register here</Link>
        </div>
      </>
    );
  }
}

export default userIsNotAuthenticated(Home);
