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
      <div className="new-event-container">
        <label>
          Copy the URL and the QR Code to share with attendees manually.
        </label>
        <a href={this.makeURL()} className="new-event-url">
          URL FOR YOUR NEW EVENT
        </a>
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
