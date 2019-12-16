import React from "react";
import QRCode from "qrcode.react";
import "../../../Registration/register.css";
import env_variable from "../../../../Reusables/EnvironmentVariables";

export default class EventSuccess extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  makeURL() {
    return env_variable.PROD_URL + "/" + window.localStorage.getItem("eventid");
  }
  renderQRCode(url) {
    return <QRCode value={url} />;
  }
  render() {
    return (
      <div>
        <label>
          Screenshot the QR Code and copy the URL below for future reference.
        </label>
        <a href={this.makeURL()}>{this.makeURL()}</a>
        {this.renderQRCode(this.makeURL())}
        <button
          className="sb-btn"
          type="submit"
          onClick={this.props.onCompletion}
        >
          SUBMIT
        </button>
      </div>
    );
  }
}
