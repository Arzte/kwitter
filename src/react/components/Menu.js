import React from "react";
import { Link } from "react-router-dom";
import "./Menu.css";
import { connect } from "react-redux";
import { logout } from "../../redux";
import AppBar from "@material-ui/core/AppBar";
import Logo from "../../img/kwitter-white.png";
import Button from "@material-ui/core/Button";
class Menu extends React.Component {
  handleLogout = event => {
    event.preventDefault();
    this.props.logout();
  };

  render() {
    return (
      <AppBar position="static" className="menu">
        <img className="menu-logo" src={Logo} alt="Kwitter Logo" />

        {this.props.isAuthenticated && (
          <div id="menu-links">
            <Link to="/profiles/:username" className="menu-font">
              <Button variant="contained" color="white" component="span">
                Home
              </Button>
            </Link>
            <Link to="/messagefeed/" className="menu-font">
              <Button variant="contained" color="white" component="span">
                Message Feed
              </Button>
            </Link>
            <Link to="/" onClick={this.handleLogout} className="menu-font">
              <Button variant="contained" color="white" component="span">
                Logout
              </Button>
            </Link>
          </div>
        )}
      </AppBar>
    );
  }
}

export default connect(
  state => ({
    result: state.auth.logout.result,
    loading: state.auth.logout.loading,
    error: state.auth.logout.error
  }),
  { logout }
)(Menu);
