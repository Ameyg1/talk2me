import React from "react";
import axios from "axios";
import KTextField from "../../../Common/TextField";
import logo from "../../../../assets/images/icon_Large.png";
import "./EnterEvent.css";

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
        .post(`https://kunektapi.azurewebsites.net/api/event/validate`, eventId)
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
            console.log("Error");
            this.displayEventData(false);
          }
        );
    }
  };

  changeLowerUI(isEventDisplayed) {
    if (isEventDisplayed) {
      return (
        <div className="lower-half">
          <div className="event-details">
            <label style={{ fontSize: "15px", textDecoration: "underline" }}>
              Your Event Details:
            </label>
            <div style={{ padding: "3px" }} />
            <label style={{ fontWeight: "bold", fontSize: "13px" }}>
              {this.state.eventDetails.EVENT_NAME}
            </label>
            <div style={{ padding: "2px" }} />
            <label style={{ fontSize: "13px" }}>
              {this.state.eventDetails.ORGANISER}
            </label>
            <div style={{ padding: "2px" }} />
            <label style={{ fontSize: "12px" }}>
              {this.state.eventDetails.VENUE}
            </label>
          </div>
          <button
            id="join-event"
            className="sb-btn"
            type="button"
            onClick={this.props.onCompletion}
          >
            Join
          </button>
        </div>
      );
    } else {
      return (
        <div className="lower-half-tour">
          <div className="kunekt-tour">
            <img src={logo} className="kunekt-logo" alt="New to Kunekt 2" />
          </div>
          <button
            id="join-event"
            className="sb-btn"
            type="button"
            onClick={this.props.onCompletion}
          >
            Take a Tour
          </button>
        </div>
      );
    }
  }

  render() {
    return (
      <div style={{ padding: "20px" }}>
        <div>
          <KTextField
            fieldTitle="Enter Event ID"
            type="embeddedButton"
            value={this.state.EVENT_ID}
            onChange={e => this.handleChange(e, "EVENT_ID")}
            fieldName="EVENT_ID"
            embeddedButtonInfo="Search"
            onButtonClick={this.checkEvent}
            helpMessage="If you know the ID of the Event you want to join, please enter it
          below to Kunekt to other attendees."
          />
        </div>
        <div style={{ padding: "10px" }} />
        {this.changeLowerUI(this.state.ui.isEventDisplayed)}
      </div>
    );
  }
}
