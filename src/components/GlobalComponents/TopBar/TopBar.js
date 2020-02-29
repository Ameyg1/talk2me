import React from "react";
import exitEventIcon from "../../../assets/icons/UserList/exit-event.png";

export default class TopBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  resetEvent = () => {
    window.localStorage.removeItem("eventid");
    window.location.reload();
  };
  renderEventDetails() {
    return (
      <div>
        <label className="event-name">{this.props.eventName}</label>
      </div>
    );
  }
  renderResetEventButton() {
    return (
      <div className="reset-event">
        <input
          className="reset-event-button-image"
          type="image"
          src={exitEventIcon}
          alt="Find other event"
          onClick={this.resetEvent}
        />
      </div>
    );
  }
  render() {
    return (
      <div className="top-bar">
        {this.renderEventDetails()}
        {this.renderResetEventButton()}
      </div>
    );
  }
}
