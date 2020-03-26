import Menu from "./Menu";
import { connect } from "react-redux";
import { getMessages } from "../../redux/messages";
import React, { Component } from "react";
import { deleteMessage } from "../../redux/deleteMessage";
import { likeMessage } from "../../redux/likes";
import { userIsAuthenticated } from "../HOCs";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import DeleteIcon from "@material-ui/icons/Delete";
import PostMessage from "./PostMessage";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "@material-ui/core";
import { getUser } from "../../redux/users";
import "./Messages.css";

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
  getMoreMessages = () => {
    let currentLength = this.props.messages.length;
    this.props.getMessages(currentLength + 100);
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
            <InfiniteScroll
              dataLength={this.props.messages.length} //This is important field to render the next data
              next={this.getMoreMessages}
              hasMore={true}
              loader={<h4>Loading...</h4>}
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
            >
              {this.props.messages.map(message => (
                <Card variant="outlined" className="card" key={message.id}>
                  <CardContent>
                    <div className="message color user">
                      <Link href={"/profiles/" + message.username}>
                        {message.username}
                      </Link>
                    </div>
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
            </InfiniteScroll>
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
    getUser: state.users.getUser.result
  };
};

export default userIsAuthenticated(
  connect(mapStateToProps, {
    getMessages,
    deleteMessage,
    likeMessage,
    getUser
  })(Messages)
);
