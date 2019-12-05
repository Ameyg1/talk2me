import React from "react";
import "./MessageBox.css";

export default class MessageBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayMessage: this.props.showMessage === "true"
    };
  }

  isSuccess(propValue) {
    if (this.props.status === "success") {
      return propValue + "-success";
    } else {
      return propValue + "-failure";
    }
  }

  renderMessageText() {
    return this.props.status === "success"
      ? "Great! Your profile is created"
      : "Please fill up the mandatory fields (marked with *)";
  }

  closeMessageBox = () => {
    this.setState({ displayMessage: false });
  };

  renderMessageBox() {
    if (this.state.displayMessage) {
      return (
        <div className={this.isSuccess("message-box")}>
          <label className={this.isSuccess("message-text")}>
            {this.renderMessageText()}
          </label>
          <button
            className={this.isSuccess("close-button")}
            onClick={this.closeMessageBox}
          >
            X
          </button>
        </div>
      );
    } else {
      return null;
    }
  }

  render() {
    return <div>{this.renderMessageBox()}</div>;
  }
}
