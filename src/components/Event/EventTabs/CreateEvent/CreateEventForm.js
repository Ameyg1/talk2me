import React from "react";
import axios from "axios";
import KTextField from "../../../Common/TextField";
import MessageBox from "../../../Common/MessageBox";
import env_variable from "../../../../Reusables/EnvironmentVariables";
import { Kunekt_Error } from "../../../../Reusables/Constants";
import "./CreateEvent.css";

export default class CreateEventForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      EVENT_ID: "",
      EVENT_NAME: "",
      ORG_EMAIL: "",
      ORGANISER: "",
      VENUE: "",
      PURPOSE: "",
      messageIsDisplayed: false
    };
  }

  /** Checks if mandatory fields are filled */
  isRequiredFieldsFilled() {
    return (
      this.state.EVENT_NAME && this.state.ORG_EMAIL && this.state.ORGANISER
    );
  }

  createEvent = e => {
    if (this.isRequiredFieldsFilled()) {
      e.preventDefault();
      const event = {
        EVENT_NAME: this.state.EVENT_NAME,
        ORG_EMAIL: this.state.ORG_EMAIL,
        ORGANISER: this.state.ORGANISER,
        VENUE: this.state.VENUE,
        PURPOSE: this.state.PURPOSE
      };
      axios.post(env_variable.BACKEND_URL + `/api/event`, event).then(
        res => {
          window.localStorage.setItem("eventid", res.data.response.insertId);
          this.props.onCompletion();
        },
        err => {
          if (err.message === "Network Error") {
            alert(Kunekt_Error.NO_INTERNET);
          } else {
            alert(Kunekt_Error.GENERIC_ERROR);
          }
        }
      );
      this.displayMessageFor("waiting");
    } else {
      this.displayMessageFor("failure");
    }
  };

  handleText = (e, name) => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      // this.checkData(this.rexExpMap[name], this.state[name], name);
    });
  };

  /**
   * Decides which message to display.
   * @param status (possible options: success | waiting | failure)
   */
  displayMessageFor(status) {
    this.setState({ messageIsDisplayed: true });
    this.setState({ messageStatus: status });
  }

  /** renders the HTML tags for the Message Box */
  renderMessage = status => {
    return (
      <MessageBox status={status} className="message" showMessage="true" />
    );
  };

  render() {
    return (
      <div className="container">
        <div className="form">
          <KTextField
            fieldTitle="Event Name *"
            type="text"
            value={this.state.EVENT_NAME}
            fieldName="EVENT_NAME"
            onChange={e => this.handleText(e, "EVENT_NAME")}
          />
          <KTextField
            fieldTitle="Name of Organiser *"
            type="text"
            value={this.state.ORGANISER}
            fieldName="ORGANISER"
            onChange={e => this.handleText(e, "ORGANISER")}
          />
          <KTextField
            fieldTitle="Email *"
            type="text"
            value={this.state.ORG_EMAIL}
            fieldName="ORG_EMAIL"
            onChange={e => this.handleText(e, "ORG_EMAIL")}
          />
          <KTextField
            fieldTitle="Venue"
            type="text"
            value={this.state.VENUE}
            fieldName="VENUE"
            onChange={e => this.handleText(e, "VENUE")}
          />
          <KTextField
            fieldTitle="This meetup is for..."
            type="textarea"
            value={this.state.PURPOSE}
            fieldName="PURPOSE"
            onChange={e => this.handleText(e, "PURPOSE")}
            helpMessage="Type in upto 100 characters."
          />
          <div className="sb-text">
            By clicking Submit, I agree that I have read and accepted the&nbsp;
            <a href="TermsandConditions">Terms and Conditions.</a>
          </div>
          {this.state.messageIsDisplayed
            ? this.renderMessage(this.state.messageStatus)
            : null}
          <button className="sb-btn" type="submit" onClick={this.createEvent}>
            SUBMIT
          </button>
          {/*<button
            className="sb-btn"
            type="submit"
            onClick={this.props.onCompletion}
          >
            GET QR CODE
          </button>*/}
          <div style={{ padding: "5px" }}></div>
        </div>
      </div>
    );
  }
}
