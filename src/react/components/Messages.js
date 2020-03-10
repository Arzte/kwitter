import { connect } from "react-redux";
import { getMessages } from "../../redux/messages";
import React, { Component } from "react";
import Menu from "./Menu";
import { deleteMessage } from "../../redux/deleteMessage";
import { likeMessage } from "../../redux/likes";

class Messages extends Component {
  componentDidMount() {
    this.props.getMessages();
  }
  handleDelete = (event, key) => {
   

    this.props.deleteMessage(event, key);
  };
  handleLike = (event, key) => {
    this.props.likeMessage(event, key);
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
              {message.text}{message.id}{message.likes["id"]}
              likes:{message.likes.length}
              {message.username === this.props.user && (
                <button onClick={e => this.handleDelete(e, message.id)}>
                  Delete
                </button>
              )}
              <button onClick={e=>this.props.likeMessage(e, message.id)}>
                Like
              </button>
              
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
    user: state.auth.login.result.username,
    likeId: state.likeMessage.likeMessage.result
  };
};

export default connect(mapStateToProps, { getMessages, deleteMessage, likeMessage })(
  Messages
);
