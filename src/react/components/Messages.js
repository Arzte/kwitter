import { connect } from "react-redux";
import { getMessages } from "../../redux/messages";
import React, { Component } from "react";
import Menu from "./Menu";
import { deleteMessage } from "../../redux/deleteMessage";

class Messages extends Component {
  componentDidMount() {
    this.props.getMessages();
  }
  handleDelete = (event, key) => {
    //console.log(key);

    this.props.deleteMessage(event, key);
  };
  render() {
    if (this.props.messages === null) {
      return <div></div>;
    } else {
      return (
        <div>
          <Menu />
          {this.props.messages.map(message => (
            <div className={message.id} key={message.id}>
              {message.text}
              {message.id}
              {message.username === this.props.user && (
                <button onClick={e => this.handleDelete(e, message.id)}>
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    messages: state.messages.getMessages.result,
    user: state.auth.login.result.username
  };
};

export default connect(mapStateToProps, { getMessages, deleteMessage })(
  Messages
);
