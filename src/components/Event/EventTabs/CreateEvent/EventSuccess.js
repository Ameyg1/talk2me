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
  returnEventID(){
    return window.localStorage.getItem("eventid");
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
          <div>
          <label style={{ textAlign: "center", paddingBottom: "10px" }}>
          EVENT ID: {this.returnEventID()}
          </label>
          </div>
          <div style={{ textAlign: "center", paddingBottom: "10px" }}>
          <label style={{ textAlign: "center", paddingBottom: "10px" }}>
            EVENT LINK:<a href={this.makeURL()} className="new-event-url"> {this.makeURL()}
            </a>
          </label>
          </div>
          {this.renderQRCode(this.makeURL())}
          <div style={{ textAlign:"center",padding: "5px" }}>Share this information in your event communications: emails, presentations, flyers.</div>
        {/* <div id="new-event-items">
             <button 
              className="sb-btn"
              id="share-button"
              type="submit"
              onClick={this.props.onCompletion}
            >
              SHARE WITH ATTENDEES
            </button>
    </div> */}
        </div>
      </div>
    );
  }
}
