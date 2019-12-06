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
    switch (this.props.status) {
      case "success":
        return propValue + "-success";
      case "waiting":
        return propValue + "-waiting";
      default:
        return propValue + "-failure";
    }
  }

  renderMessageText() {
    switch (this.props.status) {
      case "success":
        return "Great! Your profile is created";
      case "failure":
        return "Please fill up the mandatory fields (marked with *)";
      case "waiting":
        return "Please wait while we complete your registration...";
      default:
        return "Oops, something went wrong. Please try again after sometime.";
    }
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
