import React from "react";
import axios from "axios";
import KTextField from "../../../Common/TextField";
import logo from "../../../../assets/images/icon_Large.png";
import "./EnterEvent.css";
import env_variable from "../../../../Reusables/EnvironmentVariables";
import { Kunekt_Error } from "../../../../Reusables/Constants";

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
        <div className="lower-half-tour" style={{float:'left'}}>
       {/*   <div className="kunekt-tour">
           {<img src={logo} className="kunekt-logo" alt="New to Kunekt 2" /> 
          </div> */}
          <button
            id="join-event"
            className="sb-btn"
            type="button"
            onClick={this.takeATour.bind(this)}
          >
            Try the Demo
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

  /**
   * {"message":"Network Error","name":"Error","stack":"Error: Network Error\n
   * at createError (http://localhost:3000/static/js/0.chunk.js:13766:15)\n
   * at XMLHttpRequest.handleError (http://localhost:3000/static/js/0.chunk.js:13309:14)",
   * "config":{"url":"https://backend.kunekt.co/api/event/validate","method":"post",
   * "data":"{\"EVENT_ID\":\"100015\"}","headers":{"Accept":"application/json, text/plain,
   * ","Content-Type":"application/json;charset=utf-8"},"transformRequest":[null],
   * "transformResponse":[null],"timeout":0,"xsrfCookieName":"XSRF-TOKEN",
   * "xsrfHeaderName":"X-XSRF-TOKEN","maxContentLength":-1}}
   */

  render() {
    return (
      <div className="enter-event-container">
        <div>
          <KTextField
            fieldTitle="Enter Event ID"
            type="embeddedButton"
            value={this.state.EVENT_ID}
            onChange={e => this.handleChange(e, "EVENT_ID")}
            fieldName="EVENT_ID"
            embeddedButtonInfo="Search"
            onButtonClick={this.checkEvent}
            helpMessage="Contact your event host if you are not sure about the event ID.
            To try our demo, use event ID 100015."
          />
        </div>
        <div style={{ padding: "10px" }} />
        {this.changeLowerUI(this.state.ui.isEventDisplayed)}
        <div style={{ padding: "5px" }}></div>
      </div>
    );
  }
}
