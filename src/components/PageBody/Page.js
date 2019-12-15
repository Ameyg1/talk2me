import React from "react";
import MainPage from "./MainPage";
import EventPopup from "../Event/EventPopup";

export default class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEventDisplayed: true,
      eventid: ""
    };
  }

  renderMainPage() {
    return window.localStorage.getItem("eventid") ? <MainPage /> : null;
  }
  renderEventPopUp() {
    return !window.localStorage.getItem("eventid") ? (
      <EventPopup closePopup={this.popup.bind(this)} />
    ) : null;
  }

  popup = e => {
    this.setState({
      isEventDisplayed: !this.state.isEventDisplayed,
      eventid: this.state.eventid
    });
  };

  render() {
    return (
      <div>
        {this.renderEventPopUp()}
        {this.renderMainPage()}
      </div>
    );
  }
}
