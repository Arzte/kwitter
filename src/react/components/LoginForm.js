import React from "react";
import Spinner from "react-spinkit";
import { connect } from "react-redux";
import { login } from "../../redux";
import "./LoginForm.css";
import GoogleLogin from "react-google-login";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

class LoginForm extends React.Component {
  state = { username: "", password: "" };

  handleLogin = e => {
    e.preventDefault();
    this.props.login(this.state);
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  responseGoogle = response => {
    const googleRegisterData = {
      username: response.profileObj.name.slice(12),
      password: response.profileObj.googleId.slice(12)
    };
    this.props.login(googleRegisterData);
  };

  render() {
    const { loading, error } = this.props;
    return (
      <div className="wrapper">
      <Card variant="outlined" className="card">
        <CardContent>
          <form id="login-form" onSubmit={this.handleLogin}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              autoFocus
              required
              onChange={this.handleChange}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              required
              onChange={this.handleChange}
            />
            <button type="submit" disabled={loading}>
              Login
            </button>

            {loading && <Spinner name="circle" color="blue" />}
            {error && <p style={{ color: "red" }}>{error.message}</p>}

            <GoogleLogin
              clientId="146480882190-njtth0tt692me1b794rt57k3aohpleph.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={response => this.responseGoogle(response)}
              onFailure={response => this.responseGoogle(response)}
              cookiePolicy={"single_host_origin"}
            />
          </form>
        </CardContent>
      </Card>
      </div>
    );
  }
}

export default connect(
  state => ({
    result: state.auth.login.result,
    loading: state.auth.login.loading,
    error: state.auth.login.error
  }),
  { login }
)(LoginForm);
