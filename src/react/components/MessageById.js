/*import { connect } from "react-redux";
import { getMessageById } from "../../redux/messagesbyid";
import React, { Component } from "react";
import Menu from "./Menu";

class MessageById extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.getMessageById(this.props.match.params.id);
  }

  render() {
    if (this.props.messageById === null) {
      return <div>{this.props.match.params.id}</div>;
    } else {
      return (
        <div>
          <Menu />
          {this.props.match.params.id}
          {this.props.messageById[1]}
        </div>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    messageById: state.messageId.getMessagesId.result
  };
};

export default connect(mapStateToProps, { getMessageById })(MessageById);


const mapState = (state, ownProps) => {
  const { id } = ownProps.match.params
   // rest of your mapState code
*/