import React from "react";
import axios from "axios";
import KTextField from "../../../Common/TextField";
import "../../../../config/stylesheets/defaults/EnterEvent.css";
import "../../../../config/stylesheets/customisables/colors.css";
import env_variable from "../../../../Reusables/EnvironmentVariables";
import { Kunekt_Error } from "../../../../Reusables/Constants";
import searchIcon from "../../../../assets/icons/Popup/search_button.png";
import userlistHeaderLocation from "../../../../assets/icons/UserList/userlist-header-location.png";
import userListHeaderOrganiser from "../../../../assets/icons/UserList/userlist-header-organiser.png";

export default class EnterEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      EVENT_ID: "",
      ui: {
        isEventDisplayed: false
      },
      eventDetails: {
        EVENT_NAME: "",
        ORGANISER: "",
        VENUE: "",
        PURPOSE: ""
      }
    };
  }
  handleChange = (e, name) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  async displayEventData(isEventDataDisplayed, myEvent = []) {
    if (isEventDataDisplayed) {
      await this.setState({
        EVENT_ID: myEvent[0].EVENT_ID,
        ui: { isEventDisplayed: true },
        eventDetails: {
          EVENT_NAME: myEvent[0].EVENT_NAME,
          ORGANISER: myEvent[0].ORGANISER,
          VENUE: myEvent[0].VENUE,
          PURPOSE: myEvent[0].PURPOSE
        }
      });
    } else {
      await this.setState({
        EVENT_ID: "",
        ui: { isEventDisplayed: false },
        eventDetails: {
          EVENT_NAME: "",
          ORGANISER: "",
          VENUE: "",
          PURPOSE: ""
        }
      });
    }
  }

  checkEvent = () => {
    if (this.state.EVENT_ID) {
      const eventId = {
        EVENT_ID: this.state.EVENT_ID
      };
      axios
        .post(env_variable.BACKEND_URL + `/api/event/validate`, eventId)
        .then(
          res => {
            if (res.data.response.length < 1) {
              this.displayEventData(false);
              window.localStorage.removeItem("eventid");
            } else {
              this.displayEventData(true, res.data.response);
              window.localStorage.setItem("eventid", this.state.EVENT_ID);
            }
          },
          err => {
            if (err.message === "Network Error") {
              alert(Kunekt_Error.NO_INTERNET);
            } else {
              alert(Kunekt_Error.GENERIC_ERROR);
            }
            this.displayEventData(false);
          }
        );
    }
  };

  changeLowerUI(isEventDisplayed) {
    if (isEventDisplayed) {
      return (
        <div className="enter-event-lower-half">
          <div className="enter-event-event-details">
            <label className="enter-event-event-name">
              {this.state.eventDetails.EVENT_NAME}
            </label>
            <div className="enter-event-organiser-container">
              <div className="enter-event-organiser-icon-container">
                <img
                  src={userListHeaderOrganiser}
                  alt="org"
                  className="enter-event-organiser-icon"
                />
              </div>
              <label
                className="enter-event-organiser-text"
                style={{ fontSize: "13px" }}
              >
                Organiser: {this.state.eventDetails.ORGANISER}
              </label>
            </div>
            <div className="enter-event-location-container">
              <div className="enter-event-location-icon-container">
                <img
                  src={userlistHeaderLocation}
                  alt="org"
                  className="enter-event-location-icon"
                />
              </div>
              <label
                className="enter-event-location-text"
                style={{ fontSize: "12px" }}
              >
                {this.state.eventDetails.VENUE}
              </label>
            </div>
          </div>
          <button
            id="join-event"
            className="enter-event-kunekt-button"
            type="button"
            onClick={this.props.onCompletion}
          >
            Join
          </button>
        </div>
      );
    }
  }

  takeATour() {
    this.setState({ EVENT_ID: "100015" });
    const eventId = {
      EVENT_ID: "100015"
    };
    axios.post(env_variable.BACKEND_URL + `/api/event/validate`, eventId).then(
      res => {
        if (res.data.response.length < 1) {
          this.displayEventData(false);
          window.localStorage.removeItem("eventid");
          console.log("Here Error");
        } else {
          this.displayEventData(true, res.data.response);
          window.localStorage.setItem("eventid", this.state.EVENT_ID);
        }
      },
      err => {
        if (err.message === "Network Error") {
          alert(Kunekt_Error.NO_INTERNET);
        } else {
          alert(Kunekt_Error.GENERIC_ERROR);
        }
        this.displayEventData(false);
      }
    );
  }

  render() {
    return (
      <div className="enter-event-container">
        <div className="search-event-header-assets">
          <label className="enter-event-header">Enter Event</label>
          <button
            className="enter-event-demo-link"
            onClick={this.takeATour.bind(this)}
          >
            Try a demo
          </button>
        </div>
        <div className="search-event-container">
          <KTextField
            type="embeddedButton"
            buttonType="image"
            embeddedButtonInfo="search"
            value={this.state.EVENT_ID}
            onChange={e => this.handleChange(e, "EVENT_ID")}
            fieldName="EVENT_ID"
            buttonImage={searchIcon}
            onButtonClick={this.checkEvent}
            placeholder=" 100015"
            buttonClass="enter-event"
            helpMessage="Contact your event host if you are not sure about the event ID.
            To try our demo, use event ID 100015."
          />
        </div>
        <div style={{ padding: "10px" }} />
        {this.changeLowerUI(this.state.ui.isEventDisplayed)}
      </div>
    );
  }
}
