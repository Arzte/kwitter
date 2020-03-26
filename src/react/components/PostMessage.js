import { connect } from "react-redux";
import { postMessage } from "../../redux/postMessage";
import React, { Component } from "react";
import "./PostMessage.css";
import TextField from "@material-ui/core/TextField";

import SendIcon from "@material-ui/icons/Send";

class PostMessage extends Component {
  state = { text: "" };

  handleChange = event => {
    let text = { ...this.state.text };
    text = event.target.value;

    this.setState({
      text: text
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    let messageData = this.state.text;
    this.props.postMessage(messageData);
    let resetState = { ...this.state.text };
    resetState = "";
    this.setState({ text: resetState });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <TextField
            style={{ margin: 8 }}
            placeholder="Whats On Your Mind?"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
            variant="filled"
            type="text"
            id="newPost"
            name="newPost"
            value={this.state.text}
            onChange={this.handleChange}
          />

          <button className="button">
            <SendIcon />
          </button>
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    text: state.postMessage.postMessage.result
  };
};

export default connect(mapStateToProps, { postMessage })(PostMessage);
