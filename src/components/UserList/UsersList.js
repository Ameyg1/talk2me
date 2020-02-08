import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import UserAvatar from "react-user-avatar";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import MailIcon from "@material-ui/icons/Mail";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import "./UsersList.css";
import env_variable from "../../Reusables/EnvironmentVariables";
import UserListFooter from "./UserListFooter";
import exitEventIcon from "../../assets/icons/UserList/exit-event.png";

export default class UsersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Attendees: [],
      hasReceivedList: false,
      EVENT_ID: window.localStorage.getItem("eventid"),
      event: {
        name: ""
      }
    };
  }

  getEvent = async () => {
    if (this.state.event.name === "") {
      const eventId = {
        EVENT_ID: this.state.EVENT_ID
      };
      await axios
        .post(env_variable.BACKEND_URL + `/api/event/validate`, eventId)
        .then(
          res => {
            if (res.data.response.length < 1) {
              console.log("TODO: Event Validity Error");
            } else {
              this.setState({
                event: { name: res.data.response[0].EVENT_NAME }
              });
              console.log(res.data.response[0]);
            }
          },
          err => {
            console.log("TODO: Service Error");
          }
        );
    }
  };

  makeURL() {
    return env_variable.LOCAL_URL + "/profile";
  }
  getUsersList = async () => {
    if (!this.state.hasReceivedList) {
      await axios
        .get(env_variable.BACKEND_URL + "/api/attendees/" + this.state.EVENT_ID)
        .then(
          response => {
            this.setState({
              Attendees: response.data.response,
              hasReceivedList: true
            });
            console.log(JSON.stringify(response.data.response));
          },
          error => {
            console.log("TODO: Handle GetUserList error");
            this.setState({
              hasReceivedList: false
            });
          }
        );
    }
  };

  useStyles = makeStyles(theme => ({
    root: {
      width: "100%",
      maxWidth: "auto",
      backgroundColor: theme.palette.background.paper
    },
    inline: {
      display: "inline"
    }
  }));

  addAnchorFor = (platformValue, platformName) => {
    return platformValue ? (
      <span>
        <Typography
          component="span"
          variant="body2"
          className={this.useStyles.inline}
          color="textPrimary"
          style={{ paddingRight: "3px", paddingTop: "5px" }}
        >
          {this.setIconFor(platformName, platformValue)}
        </Typography>
      </span>
    ) : null;
  };

  /**
   * Icon for each of the social platform is set here.
   * @param platformName is a string that says which platform the icon belongs to.
   * @param platformValue is appended to the social platform link
   */
  setIconFor = (platformName, platformValue) => {
    switch (platformName) {
      case "facebook":
        return (
          <a href={`https://www.facebook.com/${platformValue}`}>
            <FacebookIcon fontSize="medium" />
          </a>
        );
      case "twitter":
        return (
          <a href={`https://www.twitter.com/${platformValue}`}>
            <TwitterIcon fontSize="medium" />
          </a>
        );
      case "linkedIn":
        return (
          <a href={`https://www.linkedin.com/in/${platformValue}`}>
            <LinkedInIcon fontSize="medium" />
          </a>
        );
      case "email":
        return (
          <a href={`mailto:${platformValue}`}>
            <MailIcon color="primary" fontSize="medium" />
          </a>
        );
      default:
        return null;
    }
  };

  resetEvent = () => {
    window.localStorage.removeItem("eventid");
    window.location.reload();
  };

  // Need Refactor
  goToAddProfile() {
    window.parent.location.replace(env_variable.LOCAL_URL + "/profile");
  }

  renderEventInfo() {
    return (
      <div className="event-info-container">
        <label className="event-name">{this.state.event.name}</label>
        <div className="reset-event">
          <input
            className="reset-event-button-image"
            type="image"
            src={exitEventIcon}
            alt="Find other event"
            onClick={this.resetEvent}
          />
        </div>
      </div>
    );
  }

  renderUserListHeader() {
    return (
      <div className="list-header-container">
        <label className="userlist-header">Attendee List</label>
        <button className="add-profile-button" onClick={this.goToAddProfile}>
          ADD YOUR PROFILE
        </button>
      </div>
    );
  }

  renderAttendeeCard(person) {
    if (person.ID) {
      return (
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <UserAvatar size="48" name={person.NAME} />
          </ListItemAvatar>
          <ListItemText
            primary={person.NAME}
            secondary={
              <label>
                <span>
                  {person.TITLE}
                  <span>
                    {person.COMPANY ? ", " + person.COMPANY : null}
                  </span>{" "}
                </span>
                <label>{person.BIO} </label>
                <label>
                  {this.addAnchorFor(person.EMAIL, "email")}
                  {this.addAnchorFor(person.FACEBOOK, "facebook")}
                  {this.addAnchorFor(person.TWITTER, "twitter")}
                  {this.addAnchorFor(person.LINKEDIN, "linkedIn")}
                </label>
              </label>
            }
          />
        </ListItem>
      );
    } else if (person.ID === 0) {
      return <div style={{ padding: "50px" }} />;
    }
  }

  renderUsersList() {
    if (this.state.hasReceivedList && this.state.Attendees.length === 0) {
      return (
        <div className="empty-users-list-container">
          <div style={{ color: "gray" }}>Attendees are yet to register.</div>
        </div>
      );
    } else {
      return (
        <div className="users-list-container">
          <List className={this.useStyles.root}>
            {this.state.Attendees.map(person => {
              return (
                <div key={person.ID}>
                  {this.renderAttendeeCard(person)}
                  <Divider variant="inset" component="li" />{" "}
                </div>
              );
            })}
          </List>
        </div>
      );
    }
  }
  renderFooter() {
    return (
      <div className="footer-container">
        <UserListFooter />
      </div>
    );
  }

  render() {
    this.getEvent();
    this.getUsersList();
    return (
      <div className="attedees-page-container">
        {this.renderEventInfo()}
        {this.renderUserListHeader()}
        {this.renderUsersList()}
        {this.renderFooter()}
      </div>
    );
  }
}
