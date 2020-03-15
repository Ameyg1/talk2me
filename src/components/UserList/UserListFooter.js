import React from "react";
import env_variable from "../../Reusables/EnvironmentVariables";
import KunektQRCode from "../Common/QRCode/KunektQRCode";

export default class UserListFooter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  makeURL() {
    return env_variable.PROD_URL + "/" + window.localStorage.getItem("eventid");
  }
  renderURL() {
    return (
      <label style={{ textAlign: "center", paddingBottom: "10px" }}>
        {"URL: "}
        <a href={this.makeURL()}>{this.makeURL().substring(8)}</a>
      </label>
    );
  }
  renderQRCode() {
    return <KunektQRCode />;
  }
  resetEvent = () => {
    window.localStorage.removeItem("eventid");
    window.location.reload();
  };
  renderLinkFindOtherEvent() {
    return (
      <label style={{ textAlign: "center", paddingBottom: "10px" }}>
        <a
          href={env_variable.PROD_URL}
          onClick={this.resetEvent}
          className=""
          style={{ textAlign: "center", paddingBottom: "10px" }}
        >
          Find other event
        </a>
      </label>
    );
  }
  renderLinkCreateYourEvent() {
    return (
      <label style={{ textAlign: "center", paddingBottom: "10px" }}>
        <a
          href={env_variable.PROD_URL}
          onClick={this.resetEvent}
          className=""
          style={{ textAlign: "center", paddingBottom: "10px" }}
        >
          Create your own event
        </a>
      </label>
    );
  }
  renderpower() {
    return (
      <label style={{ textAlign: "center", paddingBottom: "10px" }}>
        Powered by <a href={env_variable.PROD_URL}> Kunekt </a>
      </label>
    );
  }

  render() {
    return (
      <div>
        <div style={{ padding: "20px" }}></div>
        {this.renderQRCode()}
        <div style={{ padding: "15px" }}></div>
        {this.renderURL()}
        <div style={{ padding: "25px" }}></div>
        {this.renderLinkFindOtherEvent()}
        <div style={{ padding: "10px" }}></div>
        {this.renderLinkCreateYourEvent()}
        <div style={{ padding: "25px" }}></div>
        {this.renderpower()}
        <div style={{ padding: "20px" }}></div>
      </div>
    );
  }
}
