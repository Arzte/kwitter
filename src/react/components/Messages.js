import { connect } from "react-redux";
import { getMessages } from "../../redux/messages";
import React, { Component } from "react";
import Menu from "./Menu";
import { deleteMessage } from "../../redux/deleteMessage";
import { likeMessage } from "../../redux/likes";
import { userIsAuthenticated } from "../HOCs";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import "./Messages.css";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import DeleteIcon from "@material-ui/icons/Delete";
import PostMessage from "./PostMessage";

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
      function formatDate(string) {
        var options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(string).toLocaleDateString([], options);
      }
      return (
        <div>
          <Menu isAuthenticated={this.props.isAuthenticated} />
          <div className="wrapper">
            <Card variant="outlined" className="card">
              <CardContent>
                <PostMessage />
              </CardContent>
            </Card>
            {this.props.messages.map(message => (
              <Card variant="outlined" className="card" key={message.id}>
                <CardContent>
                  <div className="message color user">{message.username}</div>
                  <div className="message color ">{message.text}</div>

                  {message.likes["id"]}

                  {message.username === this.props.user && (
                    <div className="trash">
                      <button onClick={e => this.handleDelete(e, message.id)}>
                        <DeleteIcon fontSize="small" />
                      </button>
                    </div>
                  )}
                  <div className="likes">
                    <button
                      onClick={e => this.props.likeMessage(e, message.id)}
                    >
                      <ThumbUpIcon fontSize="small" />
                    </button>
                    <div className="message color num">
                      {message.likes.length}
                    </div>
                  </div>
                  <div className="message color created">
                    Posted on: {formatDate(message.createdAt.slice(0, 10))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    messages: state.messages.getMessages.result,
    user: state.auth.login.result.username,
    likeId: state.likeMessage.likeMessage.result,
    getUserPic: state.getaUserPic.getaUserPic.result,
    getUser: state.getaUser.getaUser.result
  };
};

export default userIsAuthenticated(
  connect(mapStateToProps, {
    getMessages,
    deleteMessage,
    likeMessage
  })(Messages)
);
