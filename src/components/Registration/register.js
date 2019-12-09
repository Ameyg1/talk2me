import React, { Component } from "react";
import Modal from "./modal";
import KTextField from "../Common/TextField";
import "./register.css";
import axios from "axios";
import MessageBox from "../Common/MessageBox";
import socialPlatformURL from "../../Reusables/Constants";

class RegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      NAME: "",
      TITLE: "",
      COMPANY: "",
      BIO: "",
      LINKEDIN: "",
      FAEBOOK: "",
      TWITTER: "",
      EMAIL: "",
      valid: {
        NAME: true,
        TITLE: true,
        COMPANY: true,
        BIO: true,
        LINKEDIN: true,
        FAEBOOK: true,
        TWITTER: true,
        EMAIL: true
      },
      touched: {
        NAME: false,
        TITLE: false,
        COMPANY: false,
        BIO: false,
        LINKEDIN: false,
        FAEBOOK: false,
        TWITTER: false,
        EMAIL: false
      },
      modalisOpen: false,
      messageIsDisplayed: false,
      messageStatus: "failure"
    };

    this.rexExpMap = {
      NAME: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
      TITLE: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
      COMPANY: /^[a-zA-Z\u00c4\u00e4\u00d6\u00f6\u00dc\u00fc\u00df]+$/,
      BIO: /^[a-zA-Z\u00c4\u00e4\u00d6\u00f6\u00dc\u00fc\u00df]+$/,
      // LINKEDIN: /^[a-zA-Z\u00c4\u00e4\u00d6\u00f6\u00dc\u00fc\u00df]+$/,
      // FAEBOOK: /^[a-zA-Z\u00c4\u00e4\u00d6\u00f6\u00dc\u00fc\u00df]+$/,
      // TWITTER: /^[a-zA-Z\u00c4\u00e4\u00d6\u00f6\u00dc\u00fc\u00df]+$/,
      EMAIL: /^[a-zA-Z\u00c4\u00e4\u00d6\u00f6\u00dc\u00fc\u00df]+$/
    };

    this.handleChange = this.handleChange.bind(this);
    this.checkData = this.checkData.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  resetState() {
    this.setState({
      NAME: "",
      TITLE: "",
      COMPANY: "",
      BIO: "",
      LINKEDIN: "",
      FAEBOOK: "",
      TWITTER: "",
      EMAIL: "",
      valid: {
        NAME: true,
        TITLE: true,
        COMPANY: true,
        BIO: true,
        LINKEDIN: true,
        FAEBOOK: true,
        TWITTER: true,
        EMAIL: true
      },
      touched: {
        NAME: false,
        TITLE: false,
        COMPANY: false,
        BIO: false,
        LINKEDIN: false,
        FAEBOOK: false,
        TWITTER: false,
        EMAIL: false
      },
      modalisOpen: false
    });
  }
  isRequiredFieldsFilled() {
    return this.state.NAME && this.state.TITLE && this.state.EMAIL;
  }

  handleChange = (e, name) => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      this.checkData(this.rexExpMap[name], this.state[name], name);
    });
  };

  handleSubmit = e => {
    if (this.isRequiredFieldsFilled()) {
      e.preventDefault();
      const user = {
        NAME: this.state.NAME,
        TITLE: this.state.TITLE,
        COMPANY: this.state.COMPANY,
        BIO: this.state.BIO,
        LINKEDIN: this.state.LINKEDIN,
        FAEBOOK: this.state.FAEBOOK,
        TWITTER: this.state.TWITTER,
        EMAIL: this.state.EMAIL
      };
      axios
        .post(`https://kunektapi.azurewebsites.net/api/attendees`, user)
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

  displayMessageFor(status) {
    this.setState({ messageIsDisplayed: true });
    this.setState({ messageStatus: status });
    window.scrollTo(0, 0);
  }

  renderMessage = status => {
    return (
      <MessageBox status={status} className="message" showMessage="true" />
    );
  };

  setFieldValidity(fieldName, isValid) {
    this.setState({
      valid: { ...this.state.valid, [fieldName]: isValid }
    });
  }

  async checkData(regExp, stateName, name) {
    this.setState({
      touched: { ...this.state.touched, [name]: true }
    });
    const errors = this.validate(
      this.state.NAME,
      this.state.TITLE,
      this.state.COMPANY,
      this.state.BIO,
      this.state.LINKEDIN,
      this.state.FAEBOOK,
      this.state.TWITTER,
      this.state.EMAIL
    );
    await this.setFieldValidity(name, !errors[name]);
    if (
      this.state.valid[name] &&
      name !== "LINKEDIN" &&
      name !== "FAEBOOK" &&
      name !== "TWITTER"
    ) {
      if (regExp.test(stateName)) {
        this.setFieldValidity(name, true);
      } else {
        this.setFieldValidity(name, false);
      }
    }
  }
  checkEmptyField(NAME, TITLE, EMAIL) {
    return {
      NAME: NAME.length === 0,
      TITLE: TITLE.length === 0,
      EMAIL: EMAIL.length === 0
    };
  }
  validateLink(LINKEDIN, FAEBOOK, TWITTER) {
    return {
      LINKEDIN: !(
        LINKEDIN.substring(0, 25) === socialPlatformURL.LINKEDIN &&
        LINKEDIN.length > 29
      ),
      FAEBOOK: !(
        FAEBOOK.substring(0, 25) === socialPlatformURL.FAEBOOK &&
        FAEBOOK.length > 29
      ),
      TWITTER: !(
        TWITTER.substring(0, 24) === socialPlatformURL.TWITTER &&
        TWITTER.length > 28
      )
    };
  }
  validate(NAME, TITLE, COMPANY, BIO, LINKEDIN, FAEBOOK, TWITTER, EMAIL) {
    const mandatoryFieldAssertions = this.checkEmptyField(NAME, TITLE, EMAIL);
    const validLinks = this.validateLink(LINKEDIN, FAEBOOK, TWITTER);
    return {
      NAME: mandatoryFieldAssertions.NAME,
      TITLE: mandatoryFieldAssertions.TITLE,
      COMPANY: false,
      BIO: false,
      LINKEDIN: validLinks.LINKEDIN,
      FAEBOOK: validLinks.FAEBOOK,
      TWITTER: validLinks.TWITTER,
      EMAIL: mandatoryFieldAssertions.EMAIL
    };
  }
  requiredStyle(name) {
    const show =
      (this.state[name] === "" || !this.state.valid[name]) &&
      this.state.touched[name];
    return { display: show ? "block" : "none" };
  }
  errorMessages(name) {
    if (name === "NAME" || name === "TITLE" || name === "EMAIL") {
      const requiredStr = "This field is required.";
      const invalidStr = "Enter a valid " + name + ".";
      if (!this.state.valid[name]) {
        return invalidStr;
      } else if (this.state[name]) {
        return requiredStr;
      }
    } else if (
      name === "LINKEDIN" ||
      name === "FAEBOOK" ||
      name === "TWITTER"
    ) {
      const invalidStr =
        "Your " +
        name +
        " URL should be in the format '" +
        socialPlatformURL[name] +
        "<your " +
        name +
        " ID>'";
      if (!this.state.valid[name]) {
        return invalidStr;
      }
    }
    return;
  }
  toggleModal() {
    this.setState(prevState => ({
      modalisOpen: !prevState.modalisOpen
    }));
  }

  render() {
    const errors = this.validate(
      this.state.NAME,
      this.state.TITLE,
      this.state.COMPANY,
      this.state.BIO,
      this.state.LINKEDIN,
      this.state.FAEBOOK,
      this.state.TWITTER,
      this.state.EMAIL
    );
    const shouldMarkError = field => {
      const hasError = errors[field];
      const shouldShow = this.state.touched[field];
      return hasError ? shouldShow : false;
    };
    const helpMessage = name => {
      return { display: shouldMarkError(name) ? "none" : "block" };
    };

    const isMobile = () => {
      if (
        navigator.userAgent.includes("Android") &&
        navigator.userAgent.includes("iPhone") &&
        navigator.userAgent.includes("iPad") &&
        navigator.userAgent.includes("Windows Phone")
      ) {
        return true;
      } else {
        return false;
      }
    };

    const setStyleForComponent = styleName => {
      return isMobile ? styleName : styleName.concat("-desktop");
    };

    return (
      <div className="container">
        <div className={setStyleForComponent("register-form")}>
          <div className="title">Create Your Free Account</div>
          {this.state.messageIsDisplayed
            ? this.renderMessage(this.state.messageStatus)
            : null}
          <div className="form">
            <KTextField
              fieldTitle="Full Name *"
              type="text"
              value={this.state.NAME}
              fieldName="NAME"
              className={shouldMarkError("NAME") ? "error" : ""}
              onChange={e => this.handleChange(e, "NAME")}
              style={this.requiredStyle("NAME")}
              errorMessage={this.errorMessages("NAME")}
            />
            <KTextField
              fieldTitle="Designation/Title *"
              type="text"
              value={this.state.TITLE}
              fieldName="TITLE"
              className={shouldMarkError("TITLE") ? "error" : ""}
              onChange={e => this.handleChange(e, "TITLE")}
              style={this.requiredStyle("TITLE")}
              errorMessage={this.errorMessages("TITLE")}
            />
            <KTextField
              fieldTitle="Email *"
              type="text"
              value={this.state.EMAIL}
              fieldName="EMAIL"
              className={shouldMarkError("EMAIL") ? "error" : ""}
              onChange={e => this.handleChange(e, "EMAIL")}
              style={this.requiredStyle("EMAIL")}
            />
            <KTextField
              fieldTitle="Company"
              type="text"
              value={this.state.COMPANY}
              fieldName="COMPANY"
              className={shouldMarkError("COMPANY") ? "error" : ""}
              onChange={e => this.handleChange(e, "COMPANY")}
              style={this.requiredStyle("COMPANY")}
            />
            <KTextField
              fieldTitle="I need help with..."
              type="textarea"
              value={this.state.BIO}
              fieldName="BIO"
              className={shouldMarkError("BIO") ? "error" : ""}
              onChange={e => this.handleChange(e, "BIO")}
              style={this.requiredStyle("BIO")}
              helpMessage="Type in upto 100 characters."
              helpMessageStyle={helpMessage("BIO")}
            />
            <KTextField
              fieldTitle="LinkedIn URL"
              type="text"
              value={this.state.LINKEDIN}
              fieldName="LINKEDIN"
              className={shouldMarkError("LINKEDIN") ? "error" : ""}
              onChange={e => this.handleChange(e, "LINKEDIN")}
              style={this.requiredStyle("LINKEDIN")}
              helpMessage="This will help invitees connect to you on LinkedIn."
              helpMessageStyle={helpMessage("LINKEDIN")}
              errorMessage={this.errorMessages("LINKEDIN")}
            />
            <KTextField
              fieldTitle="Facebook URL"
              type="text"
              value={this.state.FAEBOOK}
              fieldName="FAEBOOK"
              className={shouldMarkError("FAEBOOK") ? "error" : ""}
              onChange={e => this.handleChange(e, "FAEBOOK")}
              style={this.requiredStyle("FAEBOOK")}
              helpMessage="This will help invitees connect to you on Facebook."
              helpMessageStyle={helpMessage("FAEBOOK")}
              errorMessage={this.errorMessages("FAEBOOK")}
            />
            <KTextField
              fieldTitle="Twitter URL"
              type="text"
              value={this.state.TWITTER}
              fieldName="TWITTER"
              className={shouldMarkError("TWITTER") ? "error" : ""}
              onChange={e => this.handleChange(e, "TWITTER")}
              style={this.requiredStyle("TWITTER")}
              helpMessage="This will help invitees connect to you on Twitter."
              helpMessageStyle={helpMessage("TWITTER")}
              errorMessage={this.errorMessages("TWITTER")}
            />
            <div className="sb-text">
              By clicking Submit, I agree that I have read and accepted
              the&nbsp;
              <a href="TermsandConditions">Terms and Conditions.</a>
            </div>
            <button
              className="sb-btn"
              type="submit"
              onClick={this.handleSubmit}
            >
              SUBMIT
            </button>
          </div>
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

export default RegistrationForm;
