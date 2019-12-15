import React from "react";
import MainPage from "./MainPage";
import EventPopup from "../Event/EventPopup";

export default class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEventDisplayed: true,
      isMainPageDisplayed: false,
      eventid: ""
    };
  }

  renderMainPage(isMainPageDisplayed, withEventId) {
    return isMainPageDisplayed ? <MainPage withEventId={withEventId} /> : null;
  }

  popup = e => {
    this.setState({
      isEventDisplayed: !this.state.isEventDisplayed,
      isMainPageDisplayed: !this.state.isMainPageDisplayed,
      eventid: this.state.eventid
    });
  };

  setEventId = eventIdFromUserList => {
    this.setState({ eventid: eventIdFromUserList });
  };

  render() {
    return (
      <div>
        {console.log("URL: " + window.location.href)}
        {this.state.isEventDisplayed &&
        window.location.href ===
          "https://master.d2ymg4og9qeqjh.amplifyapp.com/" ? (
          <EventPopup
            closePopup={this.popup.bind(this)}
            eventId={this.setEventId}
          />
        ) : null}
        {this.renderMainPage(
          this.state.isMainPageDisplayed,
          this.state.eventid
        )}
      </div>
    );
  }
}
