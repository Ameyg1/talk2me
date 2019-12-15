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

export default class UsersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Attendees: [],
      EVENT_ID: window.localStorage.getItem("eventid")
    };
  }

  getUsersList = () => {
    if (this.state.Attendees.length <= 0) {
      // setStateForEventID(this.props.eventid);
      axios
        .get(
          "https://kunektapi.azurewebsites.net/api/attendees/" +
            this.state.EVENT_ID
        )
        .then(response => {
          console.log("Attendees:");
          console.log(JSON.stringify(response.data.response));
          this.setState({
            Attendees: response.data.response
          });
        });
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
            <FacebookIcon fontSize="small" />
          </a>
        );
      case "twitter":
        return (
          <a href={`https://www.twitter.com/${platformValue}`}>
            <TwitterIcon fontSize="small" />
          </a>
        );
      case "linkedIn":
        return (
          <a href={`https://www.linkedin.com/in/${platformValue}`}>
            <LinkedInIcon fontSize="small" />
          </a>
        );
      case "email":
        return (
          <a href={`mailto:${platformValue}`}>
            <MailIcon color="primary" fontSize="small" />
          </a>
        );
      default:
        return null;
    }
  };

  render() {
    this.getUsersList();
    return (
      <div>
        <List className={this.useStyles.root}>
          {this.state.Attendees.map(person => {
            return (
              <div key={person.ID}>
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
                          <span>, {person.COMPANY}</span>{" "}
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
                <Divider variant="inset" component="li" />{" "}
              </div>
            );
          })}
        </List>
      </div>
    );
  }
}
