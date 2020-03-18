import React, { Component } from "react";
import Modal from "./modal";
import KTextField from "../Common/TextField";
import "../../config/stylesheets/defaults/register.css";
import axios from "axios";
import MessageBox from "../Common/MessageBox";
import socialPlatformURL, {
  socialPlatformHomeURL,
  Kunekt_Error
} from "../../Reusables/Constants";
import env_variable from "../../Reusables/EnvironmentVariables";

class RegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      NAME: "",
      TITLE: "",
      COMPANY: "",
      BIO: "",
      LINKEDIN: "",
      FACEBOOK: "",
      TWITTER: "",
      EMAIL: "",
      EVENT_ID: window.localStorage.getItem("eventid"),
      valid: {
        NAME: true,
        TITLE: true,
        COMPANY: true,
        BIO: true,
        LINKEDIN: true,
        FACEBOOK: true,
        TWITTER: true,
        EMAIL: true
      },
      touched: {
        NAME: false,
        TITLE: false,
        COMPANY: false,
        BIO: false,
        LINKEDIN: false,
        FACEBOOK: false,
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
      // FACEBOOK: /^[a-zA-Z\u00c4\u00e4\u00d6\u00f6\u00dc\u00fc\u00df]+$/,
      // TWITTER: /^[a-zA-Z\u00c4\u00e4\u00d6\u00f6\u00dc\u00fc\u00df]+$/,
      EMAIL: /^[a-zA-Z\u00c4\u00e4\u00d6\u00f6\u00dc\u00fc\u00df]+$/
    };

    this.handleChange = this.handleChange.bind(this);
    this.checkData = this.checkData.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  /** Resets the required states of the component to its initial values. */
  resetState() {
    this.setState({
      NAME: "",
      TITLE: "",
      COMPANY: "",
      BIO: "",
      LINKEDIN: "",
      FACEBOOK: "",
      TWITTER: "",
      EMAIL: "",
      valid: {
        NAME: true,
        TITLE: true,
        COMPANY: true,
        BIO: true,
        LINKEDIN: true,
        FACEBOOK: true,
        TWITTER: true,
        EMAIL: true
      },
      touched: {
        NAME: false,
        TITLE: false,
        COMPANY: false,
        BIO: false,
        LINKEDIN: false,
        FACEBOOK: false,
        TWITTER: false,
        EMAIL: false
      },
      modalisOpen: false
    });
  }

  /** Checks if mandatory fields are filled */
  isRequiredFieldsFilled() {
    return this.state.NAME && this.state.TITLE && this.state.EMAIL;
  }

  /** Dictates what happens if a textfield value is changed */
  handleChange = (e, name) => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      this.checkData(this.rexExpMap[name], this.state[name], name);
    });
  };

  /** Dictates what happens on click of Submit button */
  handleSubmit = e => {
    if (this.isRequiredFieldsFilled()) {
      e.preventDefault();
      const user = {
        NAME: this.state.NAME,
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
          env_variable.BACKEND_URL + `/api/attendees/` + this.state.EVENT_ID,
          user
        )
        .then(
          res => {
            console.log(res.data);
            this.resetState();
            this.displayMessageFor("success");
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
      this.displayMessageFor("required fields not filled failure");
    }
  };

  /**
   * Decides which message to display.
   * @param status (possible options: success | waiting | failure)
   */
  displayMessageFor(status) {
    this.setState({ messageIsDisplayed: true });
    this.setState({ messageStatus: status });
    window.scrollTo(0, 0);
  }

  /** renders the HTML tags for the Message Box */
  renderMessage = status => {
    return (
      <MessageBox status={status} className="message" showMessage="true" />
    );
  };

  /**
   * Sets the state for field
   * @param fieldName
   * @param isValid
   */
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
      this.state.FACEBOOK,
      this.state.TWITTER,
      this.state.EMAIL
    );
    await this.setFieldValidity(name, !errors[name]);
    if (
      this.state.valid[name] &&
      name !== "LINKEDIN" &&
      name !== "FACEBOOK" &&
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
  validateLink(LINKEDIN, FACEBOOK, TWITTER) {
    return {
      LINKEDIN: !(LINKEDIN.length > 4),
      FACEBOOK: !(FACEBOOK.length > 4),
      TWITTER: !(TWITTER.length > 4)
    };
  }
  validate(NAME, TITLE, COMPANY, BIO, LINKEDIN, FACEBOOK, TWITTER, EMAIL) {
    const mandatoryFieldAssertions = this.checkEmptyField(NAME, TITLE, EMAIL);
    const validLinks = this.validateLink(LINKEDIN, FACEBOOK, TWITTER);
    return {
      NAME: mandatoryFieldAssertions.NAME,
      TITLE: mandatoryFieldAssertions.TITLE,
      COMPANY: false,
      BIO: false,
      LINKEDIN: validLinks.LINKEDIN,
      FACEBOOK: validLinks.FACEBOOK,
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
      name === "FACEBOOK" ||
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
      this.state.FACEBOOK,
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

    const renderBackButton = () => {
      return (
        <div className="back-button-container">
          <button className="back-button" onClick={goToUserlist}>
            <label className="back-button-icon">{"<"}</label>
            <label className="back-button-text">{"Back"}</label>
          </button>
        </div>
      );
    };

    const goToUserlist = () => {
      window.parent.location.replace(env_variable.PROD_URL);
    };

    const renderScreenHeader = () => {
      return (
        <div className="app-header">
          <div className="userlist-primary-header-line">
            <label className="register-details-header">
              Add your profile to the event
            </label>
          </div>
          <div className="userlist-secondary-header-line">
            <label className="register-details-subheader">
              Create your digital business card and help others connect with you
            </label>
          </div>
        </div>
      );
    };

    return (
      <div className="container">
        {renderScreenHeader()}
        <div className={setStyleForComponent("register-form")}>
          {renderBackButton()}
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
              fieldTitle="Email *"
              type="text"
              value={this.state.EMAIL}
              fieldName="EMAIL"
              className={shouldMarkError("EMAIL") ? "error" : ""}
              onChange={e => this.handleChange(e, "EMAIL")}
              style={this.requiredStyle("EMAIL")}
            />
            <KTextField
              fieldTitle="Position/Title at Work *"
              type="text"
              value={this.state.TITLE}
              fieldName="TITLE"
              className={shouldMarkError("TITLE") ? "error" : ""}
              onChange={e => this.handleChange(e, "TITLE")}
              style={this.requiredStyle("TITLE")}
              errorMessage={this.errorMessages("TITLE")}
            />
            <KTextField
              fieldTitle="Organisation"
              type="text"
              value={this.state.COMPANY}
              fieldName="COMPANY"
              className={shouldMarkError("COMPANY") ? "error" : ""}
              onChange={e => this.handleChange(e, "COMPANY")}
              style={this.requiredStyle("COMPANY")}
            />
            <KTextField
              fieldTitle="Text on Digital Business Card"
              type="textarea"
              placeholder="I need with "
              value={this.state.BIO}
              fieldName="BIO"
              className={shouldMarkError("BIO") ? "error" : ""}
              onChange={e => this.handleChange(e, "BIO")}
              style={this.requiredStyle("BIO")}
              helpMessage="Type in upto 400 characters."
              helpMessageStyle={helpMessage("BIO")}
            />
            <KTextField
              fieldTitle="LinkedIn URL"
              type="socialLink"
              prefieldInfo={socialPlatformHomeURL.LINKEDIN}
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
              type="socialLink"
              prefieldInfo={socialPlatformHomeURL.FACEBOOK}
              value={this.state.FACEBOOK}
              fieldName="FACEBOOK"
              className={shouldMarkError("FACEBOOK") ? "error" : ""}
              onChange={e => this.handleChange(e, "FACEBOOK")}
              style={this.requiredStyle("FACEBOOK")}
              helpMessage="This will help invitees connect to you on Facebook."
              helpMessageStyle={helpMessage("FACEBOOK")}
              errorMessage={this.errorMessages("FACEBOOK")}
            />
            <KTextField
              fieldTitle="Twitter URL"
              type="socialLink"
              prefieldInfo={socialPlatformHomeURL.TWITTER}
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
              <a href="https://www.kunekt.co/terms-software/">
                Terms and Conditions.
              </a>
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
