import { connect } from "react-redux";
import { deleteMessage } from "../../redux/deleteMessage";
import React, { Component } from "react";

class DeleteMessage extends Component {
  constructor(props) {
    super(props);
    this.state = { text: "" };
  }
  /*handleChange = event => {
    console.log("ppppp");
    let text = { ...this.state.text };
    text = event.target.value;

    this.setState({
      text: text
    });
  };*/

  handleSubmit = (event) => {
    event.preventDefault();
    let messageData = this.state.text;
    this.props.postMessage(messageData);
    this.setState({ text: '' });
  };

  render() {
    return (
      <div>
        test
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="newPost">Answer</label>
          <input
            type="text"
            id="newPost"
            name="newPost"
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
