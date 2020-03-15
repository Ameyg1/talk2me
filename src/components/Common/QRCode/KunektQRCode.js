import React from "react";
import QRCode from "qrcode.react";
import env_variable from "../../../Reusables/EnvironmentVariables";

export default class KunektQRCode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  makeURL() {
    return env_variable.PROD_URL + "/" + window.localStorage.getItem("eventid");
  }
  renderQRCode(url) {
    return <QRCode value={url} id="new-event-items" />;
  }

  render() {
    return <div>{this.renderQRCode(this.makeURL())}</div>;
  }
}
