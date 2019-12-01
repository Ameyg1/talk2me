import React, { Component } from "react";
import Modal from "./modal";
import KTextField from "../Common/TextField";
import "./register.css";
import axios from "axios";

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
      modalisOpen: false
    };

    this.rexExpMap = {
      NAME: /^[a-zA-Z\u00c4\u00e4\u00d6\u00f6\u00dc\u00fc\u00df]+$/,
      TITLE: /^[a-zA-Z\u00c4\u00e4\u00d6\u00f6\u00dc\u00fc\u00df]+$/,
      COMPANY: /^[a-zA-Z\u00c4\u00e4\u00d6\u00f6\u00dc\u00fc\u00df]+$/,
      BIO: /^[a-zA-Z\u00c4\u00e4\u00d6\u00f6\u00dc\u00fc\u00df]+$/,
      LINKEDIN: /^[a-zA-Z\u00c4\u00e4\u00d6\u00f6\u00dc\u00fc\u00df]+$/,
      FAEBOOK: /^[a-zA-Z\u00c4\u00e4\u00d6\u00f6\u00dc\u00fc\u00df]+$/,
      TWITTER: /^[a-zA-Z\u00c4\u00e4\u00d6\u00f6\u00dc\u00fc\u00df]+$/,
      EMAIL: /^[a-zA-Z\u00c4\u00e4\u00d6\u00f6\u00dc\u00fc\u00df]+$/
    };

    this.handleChange = this.handleChange.bind(this);
    this.checkData = this.checkData.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.checkOnSubmit = this.checkOnSubmit.bind(this);
  }

  handleChange = (e, name) => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      this.checkData(
        this.rexExpMap[name],
        this.state[name],
        this.state.valid[name],
        name
      );
    });
  };
  handleSubmit = e => {
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
      .then(res => {
        console.log(res);
        console.log(res.data);
      });
  };

  checkData(regExp, stateName, stateValid, name) {
    this.setState({
      touched: { ...this.state.touched, [name]: true }
    });
    if (regExp.test(stateName)) {
      this.setState({
        valid: { ...this.state.valid, [name]: true }
      });
    } else {
      this.setState({
        valid: { ...this.state.valid, [name]: false }
      });
    }
  }
  validate(NAME, TITLE, BIO, LINKEDIN, FAEBOOK, TWITTER, EMAIL) {
    return {
      NAME: NAME.length === 0,
      TITLE: TITLE.length === 0,
      BIO: BIO.length === 0,
      LINKEDIN: LINKEDIN.length === 0,
      FAEBOOK: FAEBOOK.length === 0,
      TWITTER: TWITTER.length === 0,
      EMAIL: EMAIL.length === 0
    };
  }
  requiredStyle(name) {
    const show =
      (this.state[name] === "" || !this.state.valid[name]) &&
      this.state.touched[name];
    return { display: show ? "block" : "none" };
  }
  errorMessages(name) {
    const requiredStr = "This field is required.";
    const invalidStr = "Enter a valid " + name + ".";
    return !this.state.valid[name] && this.state[name] !== ""
      ? invalidStr
      : requiredStr;
  }
  checkOnSubmit() {
    const { NAME, TITLE, BIO, LINKEDIN } = this.state;
    const formFilled = !(
      NAME === "" ||
      TITLE === "" ||
      BIO === "" ||
      LINKEDIN === ""
    );
    const formInvalid = Object.keys(this.state.valid).some(
      x => !this.state.valid[x]
    );
    const formHasErrors = !formFilled || formInvalid;

    if (!formHasErrors) {
      this.toggleModal();
    }
    this.setState({
      touched: {
        NAME: true,
        TITLE: true,
        COMPANY: true,
        BIO: true,
        LINKEDIN: true
      }
    });
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
          <div className="form">
            <KTextField
              fieldTitle="Full Name *"
              type="text"
              value={this.state.NAME}
              fieldName="NAME"
              className={shouldMarkError("NAME") ? "error" : ""}
              onChange={e => this.handleChange(e, "NAME")}
              style={this.requiredStyle("NAME")}
              // errorMessage={this.errorMessages("NAME")}
            />
            <KTextField
              fieldTitle="Designation/Title *"
              type="text"
              value={this.state.TITLE}
              fieldName="TITLE"
              className={shouldMarkError("TITLE") ? "error" : ""}
              onChange={e => this.handleChange(e, "TITLE")}
              style={this.requiredStyle("TITLE")}
              // errorMessage={this.errorMessages("TITLE")}
            />
            <KTextField
              fieldTitle="Company"
              type="text"
              value={this.state.COMPANY}
              fieldName="COMPANY"
              className={shouldMarkError("COMPANY") ? "error" : ""}
              onChange={e => this.handleChange(e, "COMPANY")}
              style={this.requiredStyle("COMPANY")}
              // errorMessage={this.errorMessages("COMPANY")}
            />
            <KTextField
              fieldTitle="I need help with..."
              type="text"
              value={this.state.BIO}
              fieldName="BIO"
              className={shouldMarkError("BIO") ? "error" : ""}
              onChange={e => this.handleChange(e, "BIO")}
              style={this.requiredStyle("BIO")}
              // errorMessage={this.errorMessages("BIO")}
              helpMessage="Type in why you're joining this event."
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
              // errorMessage={this.errorMessages("LINKEDIN")}
              helpMessage="This will help invitees connect to you on LinkedIn."
              helpMessageStyle={helpMessage("LINKEDIN")}
            />
            <KTextField
              fieldTitle="Facebook URL"
              type="text"
              value={this.state.FAEBOOK}
              fieldName="FAEBOOK"
              className={shouldMarkError("FAEBOOK") ? "error" : ""}
              onChange={e => this.handleChange(e, "FAEBOOK")}
              style={this.requiredStyle("FAEBOOK")}
              // errorMessage={this.errorMessages("FAEBOOK")}
              helpMessage="This will help invitees connect to you on Facebook."
              helpMessageStyle={helpMessage("FAEBOOK")}
            />
            <KTextField
              fieldTitle="Twitter URL"
              type="text"
              value={this.state.TWITTER}
              fieldName="TWITTER"
              className={shouldMarkError("TWITTER") ? "error" : ""}
              onChange={e => this.handleChange(e, "TWITTER")}
              style={this.requiredStyle("TWITTER")}
              // errorMessage={this.errorMessages("TWITTER")}
              helpMessage="This will help invitees connect to you on Twitter."
              helpMessageStyle={helpMessage("TWITTER")}
            />
            <KTextField
              fieldTitle="Email"
              type="text"
              value={this.state.EMAIL}
              fieldName="EMAIL"
              className={shouldMarkError("EMAIL") ? "error" : ""}
              onChange={e => this.handleChange(e, "EMAIL")}
              style={this.requiredStyle("EMAIL")}
              // errorMessage={this.errorMessages("EMAIL")}
              helpMessage="This will help invitees connect to you on Twitter."
              helpMessageStyle={helpMessage("EMAIL")}
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
