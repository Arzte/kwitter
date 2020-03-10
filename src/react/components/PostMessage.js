import { connect } from "react-redux";
import { postMessage } from "../../redux/postMessage";
import React, { Component } from "react";

class PostMessage extends Component {
  constructor(props) {
    super(props);
    this.state = { text: "" };
  }
  handleChange = event => {
    
    let text = { ...this.state.text };
    text = event.target.value;

    this.setState({
      text: text
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    let messageData = this.state.text;
    this.props.postMessage(messageData);
    let resetState = {...this.state.text}
    resetState = ""
    this.setState({ text: resetState });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="newPost">Post a new Message</label>
          <input
            type="text"
            id="newPost"
            name="newPost"
            value={this.state.text}
            onChange={this.handleChange}
          />
          <button>Submit Post</button>
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
