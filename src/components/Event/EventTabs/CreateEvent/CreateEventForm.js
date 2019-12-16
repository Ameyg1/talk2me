import React from "react";
import axios from "axios";
import KTextField from "../../../Common/TextField";
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
      PURPOSE: ""
    };
  }

  /** Checks if mandatory fields are filled */
  isRequiredFieldsFilled() {
    return (
      this.state.EVENT_NAME && this.state.ORG_EMAIL && this.state.ORGANISER
    );
  }

  createEvent = e => {
    console.log("In");
    console.log(
      this.state.EVENT_NAME && this.state.ORG_EMAIL && this.state.ORGANISER
        ? true
        : false
    );
    if (this.isRequiredFieldsFilled()) {
      console.log("In again");
      e.preventDefault();
      const event = {
        EVENT_NAME: this.state.EVENT_NAME,
        ORG_EMAIL: this.state.ORG_EMAIL,
        ORGANISER: this.state.ORGANISER,
        VENUE: this.state.VENUE,
        PURPOSE: this.state.PURPOSE
      };
      axios.post(`https://kunektapi.azurewebsites.net/api/event`, event).then(
        async res => {
          await console.log(res.data.response.insertId);
          // await console.log(res.data.response[0].insertId);
          // this.displayMessageFor("success");
        },
        err => {
          // this.displayMessageFor("request failure");
        }
      );
      // this.displayMessageFor("waiting");
    } else {
      // this.displayMessageFor("failure");
    }
  };

  handleText = (e, name) => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      // this.checkData(this.rexExpMap[name], this.state[name], name);
    });
  };

  render() {
    return (
      <div className="container">
        {this.state.messageIsDisplayed
          ? this.renderMessage(this.state.messageStatus)
          : null}
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
          <button className="sb-btn" type="submit" onClick={this.createEvent}>
            SUBMIT
          </button>
          <div style={{ padding: "20px" }}></div>
        </div>
      </div>
    );
  }
}
