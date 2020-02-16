import React from "react";
import "../../config/stylesheets/defaults/MessageBox.css";
import "../../config/stylesheets/customisables/colors.css";

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
        return this.props.customMessage
          ? this.props.customMessage
          : "Great! Your profile is created";
      case "failure":
        return this.props.customMessage
          ? this.props.customMessage
          : "Please fill up the mandatory fields (marked with *)";
      case "waiting":
        return this.props.customMessage
          ? this.props.customMessage
          : "Please wait while we complete your registration...";
      default:
        return this.props.customMessage
          ? this.props.customMessage
          : "Oops, something went wrong. Please try again after sometime.";
    }
  }

  closeMessageBox = () => {
    this.setState({ displayMessage: false });
  };

  renderCloseButton() {
    if (this.props.closeButton === "hide") {
      return null;
    } else {
      return (
        <button
          className={this.isSuccess("close-button")}
          onClick={this.closeMessageBox}
        >
          X
        </button>
      );
    }
  }

  renderMessageBox() {
    if (this.state.displayMessage) {
      return (
        <div className={this.isSuccess("message-box")}>
          <label className={this.isSuccess("message-text")}>
            {this.renderMessageText()}
          </label>
          {this.renderCloseButton()}
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
