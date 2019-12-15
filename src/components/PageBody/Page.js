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
        {this.state.isEventDisplayed ? (
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
