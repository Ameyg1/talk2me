import React from "react";
import axios from "axios";
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

  checkEventId = async (appendedString, genericURL) => {
    if (appendedString.slice(-5) !== "admin") {
      const eventId = {
        EVENT_ID: appendedString
      };
      await axios
        .post(env_variable.BACKEND_URL + `/api/event/validate`, eventId)
        .then(
          res => {
            if (res.data.response.length !== 0) {
              window.localStorage.setItem("eventid", appendedString);
              window.parent.location.replace(genericURL);
            } else {
              alert(
                "The Event ID in the URL is not valid. You are being redirected to the Home page."
              );
              window.localStorage.removeItem("eventid");
              window.parent.location.replace(genericURL);
            }
          },
          err => {
            console.log("TODO: Service Error");
          }
        );
    }
  };

  render() {
    const genericURL = env_variable.PROD_URL;
    if (window.location.href.length > genericURL.length + 1) {
      const appendedString = window.location.href.substring(
        genericURL.length + 1
      );
      this.checkEventId(appendedString, genericURL);
    }
    return (
      <div>
        {this.renderEventPopUp()}
        {this.renderMainPage()}
      </div>
    );
  }
}
