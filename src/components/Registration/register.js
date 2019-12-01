import React, { Component } from "react";
import Modal from "./modal";
import KTextField from "../Common/TextField";
import "./register.css";

class RegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      email: "",
      phoneNumber: "",
      aboutMe: "",
      linkedIn: "",
      valid: {
        fullName: true,
        email: true,
        phoneNumber: true,
        aboutMe: true,
        linkedIn: true
      },
      touched: {
        fullName: false,
        email: false,
        phoneNumber: false,
        aboutMe: false,
        linkedIn: false
      },
      modalisOpen: false
    };

    this.rexExpMap = {
      fullName: /^[a-zA-Z\u00c4\u00e4\u00d6\u00f6\u00dc\u00fc\u00df]+$/,
      email: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
      phoneNumber: /^.{8,}$/,
      aboutMe: /^[a-z\d._]+$/,
      linkedIn: /^[a-zA-Z\u00c4\u00e4\u00d6\u00f6\u00dc\u00fc\u00df]+$/
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
  validate(fullName, email, aboutMe, linkedIn) {
    return {
      fullName: fullName.length === 0,
      email: email.length === 0,
      aboutMe: aboutMe.length === 0,
      linkedIn: linkedIn.length === 0
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
    const { fullName, email, aboutMe, linkedIn } = this.state;
    const formFilled = !(
      fullName === "" ||
      email === "" ||
      aboutMe === "" ||
      linkedIn === ""
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
        fullName: true,
        email: true,
        phoneNumber: true,
        aboutMe: true,
        linkedIn: true
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
      this.state.fullName,
      this.state.email,
      this.state.aboutMe,
      this.state.linkedIn
    );
    const shouldMarkError = field => {
      const hasError = errors[field];
      const shouldShow = this.state.touched[field];
      return hasError ? shouldShow : false;
    };
    const helpMessage = name => {
      return { display: shouldMarkError(name) ? "none" : "block" };
    };

    return (
      <div className="container">
        <div className="register-form">
          <div className="title">Create Your Free Account</div>
          <div className="form">
            <KTextField
              fieldTitle="Full Name *"
              type="text"
              value={this.state.fullName}
              fieldName="fullName"
              className={shouldMarkError("fullName") ? "error" : ""}
              onChange={e => this.handleChange(e, "fullName")}
              style={this.requiredStyle("fullName")}
              errorMessage={this.errorMessages("fullName")}
            />
            <KTextField
              fieldTitle="Email *"
              type="text"
              value={this.state.email}
              fieldName="email"
              className={shouldMarkError("email") ? "error" : ""}
              onChange={e => this.handleChange(e, "email")}
              style={this.requiredStyle("email")}
              errorMessage={this.errorMessages("email")}
            />
            <KTextField
              fieldTitle="Phone No."
              type="text"
              value={this.state.phoneNumber}
              fieldName="phoneNumber"
              className={shouldMarkError("phoneNumber") ? "error" : ""}
              onChange={e => this.handleChange(e, "phoneNumber")}
              style={this.requiredStyle("phoneNumber")}
              errorMessage={this.errorMessages("phoneNumber")}
            />
            <KTextField
              fieldTitle="I need help with..."
              type="aboutMe"
              value={this.state.phoneNumber}
              fieldName="aboutMe"
              className={shouldMarkError("aboutMe") ? "error" : ""}
              onChange={e => this.handleChange(e, "aboutMe")}
              style={this.requiredStyle("aboutMe")}
              errorMessage={this.errorMessages("aboutMe")}
              helpMessage="Type in why you're joining this event."
              helpMessageStyle={helpMessage("aboutMe")}
            />
            <KTextField
              fieldTitle="LinkedIn URL"
              type="text"
              value={this.state.linkedIn}
              fieldName="linkedIn"
              className={shouldMarkError("linkedIn") ? "error" : ""}
              onChange={e => this.handleChange(e, "linkedIn")}
              style={this.requiredStyle("linkedIn")}
              errorMessage={this.errorMessages("linkedIn")}
              helpMessage="This will help invitees connect to you on LinkedIn."
              helpMessageStyle={helpMessage("linkedIn")}
            />
            <div className="sb-text">
              By clicking Submit, I agree that I have read and accepted
              the&nbsp;
              <a href="TermsandConditions">Terms and Conditions.</a>
            </div>
            <button
              className="sb-btn"
              type="button"
              onClick={this.checkOnSubmit}
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
