import React from "react";
import axios from "axios";
import KTextField from "../../../Common/TextField";
import Modal from "../../../Registration/modal";
import "./CreateEvent.css";

export default class CreateEventForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      EVENT_ID: "",
      EVENT_NAME: "",
      ORGANISER: "",
      VENUE: "",
      PURPOSE: ""
    };
  }
  createEvennt = e => {
    if (this.isRequiredFieldsFilled()) {
      e.preventDefault();
      const user = {
        NAME: this.state.EVENT_ID,
        TITLE: this.state.TITLE,
        COMPANY: this.state.COMPANY,
        BIO: this.state.BIO,
        LINKEDIN: this.state.LINKEDIN,
        FACEBOOK: this.state.FACEBOOK,
        TWITTER: this.state.TWITTER,
        EMAIL: this.state.EMAIL,
        EVENT_ID: this.state.EVENT_ID
      };
      axios
        .post(
          `https://kunektapi.azurewebsites.net/api/attendees/` +
            this.state.EVENT_ID,
          user
        )
        .then(
          res => {
            console.log(res.data);
            this.resetState();
            this.displayMessageFor("success");
          },
          err => {
            this.displayMessageFor("request failure");
          }
        );
      this.displayMessageFor("waiting");
    } else {
      this.displayMessageFor("failure");
    }
  };

  handleText = e => {};
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
            value={this.state.NAME}
            fieldName="NAME"
            onChange={e => this.handleText(e)}
          />
          <KTextField
            fieldTitle="Name of Organiser *"
            type="text"
            value={this.state.TITLE}
            fieldName="TITLE"
            onChange={e => this.handleText(e)}
          />
          <KTextField
            fieldTitle="Email *"
            type="text"
            value={this.state.EMAIL}
            fieldName="EMAIL"
            onChange={e => this.handleText(e)}
          />
          <KTextField
            fieldTitle="Venue"
            type="text"
            value={this.state.COMPANY}
            fieldName="COMPANY"
            onChange={e => this.handleText(e)}
          />
          <KTextField
            fieldTitle="This meetup is for..."
            type="textarea"
            value={this.state.BIO}
            fieldName="BIO"
            onChange={e => this.handleText(e)}
            helpMessage="Type in upto 100 characters."
          />
          <div className="sb-text">
            By clicking Submit, I agree that I have read and accepted the&nbsp;
            <a href="TermsandConditions">Terms and Conditions.</a>
          </div>
          <button
            className="sb-btn"
            type="submit"
            onClick={this.props.onCompletion}
          >
            SUBMIT
          </button>
        </div>
        {this.state.modalisOpen ? (
          <Modal
            text="Your Data"
            {...this.state}
            closeModal={this.toggleModal}
          />
        ) : null}
      </div>
    );
  }
}
