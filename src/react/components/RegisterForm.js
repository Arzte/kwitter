import React from "react";
import Spinner from "react-spinkit";
import { connect } from "react-redux";
import { register } from "../../redux";
import "./LoginForm.css";
import GoogleLogin from "react-google-login";

class RegisterForm extends React.Component {
  state = { displayName: "", username: "", password: "" };

  handleLogin = e => {
    e.preventDefault();
    this.props.register(this.state);
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  responseGoogle = response => {
    const googleRegisterData = {
      username: response.profileObj.name.slice(12),
      displayName: response.profileObj.givenName,
      password: response.profileObj.googleId.slice(12)
    };
    this.props.register(googleRegisterData);
  };

  render() {
    const { loading, error } = this.props;
    return (
      <React.Fragment>
        <form id="login-form" onSubmit={this.handleLogin}>
          <label htmlFor="displayname">Display Name</label>
          <input
            type="text"
            name="displayName"
            autoFocus
            required
            maxLength={20}
            minLength={3}
            onChange={this.handleChange}
          />
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
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
            Register User
          </button>
        </form>
        <GoogleLogin
          clientId="146480882190-njtth0tt692me1b794rt57k3aohpleph.apps.googleusercontent.com"
          buttonText="Register"
          onSuccess={response => this.responseGoogle(response)}
          onFailure={response => this.responseGoogle(response)}
          cookiePolicy={"single_host_origin"}
        />
        {loading && <Spinner name="circle" color="blue" />}
        {error && <p style={{ color: "red" }}>{error.message}</p>}
      </React.Fragment>
    );
  }
}

export default connect(
  state => ({
    result: state.auth.register.result,
    loading: state.auth.register.loading,
    error: state.auth.register.error
  }),
  { register }
)(RegisterForm);
