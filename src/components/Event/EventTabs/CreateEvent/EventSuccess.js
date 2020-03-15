import React from "react";
import MessageBox from "../../../Common/MessageBox";
import "../../../../config/stylesheets/defaults/CreateEvent.css";
import KunektQRCode from "../../../Common/QRCode/KunektQRCode";
import env_variable from "../../../../Reusables/EnvironmentVariables";

export default class EventSuccess extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  makeURL() {
    return env_variable.PROD_URL + "/" + window.localStorage.getItem("eventid");
  }
  returnEventID() {
    return window.localStorage.getItem("eventid");
  }
  render() {
    return (
      <div className="create-event-new-event-container">
        <MessageBox
          status="success"
          className="message"
          showMessage="true"
          closeButton="hide"
          customMessage="Your event was successfully created! Copy the URL and the QR Code to share with attendees manually."
        />
        <div style={{ padding: "5px" }}></div>
        <div className="create-event-info-border">
          <div>
            <label style={{ textAlign: "center", paddingBottom: "10px" }}>
              EVENT ID: {this.returnEventID()}
            </label>
          </div>
          <div style={{ textAlign: "center", paddingBottom: "10px" }}>
            <label style={{ textAlign: "center", paddingBottom: "10px" }}>
              EVENT LINK:
              <a href={this.makeURL()} className="create-event-new-event-url">
                {" "}
                {this.makeURL()}
              </a>
            </label>
          </div>
          <KunektQRCode />
          <div style={{ textAlign: "center", padding: "5px" }}>
            Share this information in your event communications: emails,
            presentations, flyers.
          </div>
        </div>
      </div>
    );
  }
}
