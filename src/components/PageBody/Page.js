import React from "react";
import MainPage from "./MainPage";
import EventPopup from "../Event/EventPopup";
import env_variable from "../../Reusables/EnvironmentVariables";

export default class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEventDisplayed: true,
      eventid: ""
    };
  }

  renderMainPage(isEventDisplayed, withEventId) {
    return !isEventDisplayed ? <MainPage withEventId={withEventId} /> : null;
  }
  renderEventPopUp(withEventId) {
    if (window.location.href === env_variable.LOCAL_URL) {
      return (
        <EventPopup
          closePopup={this.popup.bind(this)}
          eventId={this.setEventId}
        />
      );
    } else {
      return <MainPage />;
    }
  }

  popup = e => {
    this.setState({
      isEventDisplayed: !this.state.isEventDisplayed,
      eventid: this.state.eventid
    });
  };

  setEventId = eventIdFromUserList => {
    this.setState({ eventid: eventIdFromUserList });
    window.localStorage.setItem("eventid", this.state.eventid);
  };

  render() {
    return (
      <div>
        {this.state.isEventDisplayed ? this.renderEventPopUp() : null}
        {this.renderMainPage(this.state.isEventDisplayed, this.state.eventid)}
      </div>
    );
  }
}
