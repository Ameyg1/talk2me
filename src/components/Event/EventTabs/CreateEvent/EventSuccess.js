import React from "react";
import QRCode from "qrcode.react";
import MessageBox from "../../../Common/MessageBox";
import "./CreateEvent.css";
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
    return <QRCode value={url} id="new-event-items" />;
  }
  render() {
    return (
      <div className="new-event-container">
        <MessageBox
          status="success"
          className="message"
          showMessage="true"
          closeButton="hide"
          customMessage="Your event was successfully created! Copy the URL and the QR Code to share with attendees manually."
        />
        <div style={{ padding: "5px" }}></div>
        <div className="event-info-border">
          <label style={{ textAlign: "center", paddingBottom: "10px" }}>
            EVENT LINK:
          </label>
          <div style={{ textAlign: "center", paddingBottom: "10px" }}>
            <a href={this.makeURL()} className="new-event-url">
              URL FOR YOUR NEW EVENT
            </a>
          </div>
          {this.renderQRCode(this.makeURL())}
          <div style={{ padding: "5px" }}></div>
          <div id="new-event-items">
            <button
              className="sb-btn"
              id="share-button"
              type="submit"
              onClick={this.props.onCompletion}
            >
              SHARE WITH ATTENDEES
            </button>
          </div>
        </div>
      </div>
    );
  }
}
