import React, { useState, useEffect } from "react";
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
const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: "auto",
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: "inline"
  }
}));
const initialState = {
  Attendees: []
};

export default function AlignItemsList() {
  const classes = useStyles();
  const [state, setState] = useState(initialState);
  useEffect(() => {
    if (state.Attendees.length <= 0) {
      axios
        .get("https://kunektapi.azurewebsites.net/api/attendees")
        .then(response => {
          console.log(JSON.stringify(response.data.response));
          setState({
            Attendees: response.data.response
          });
        });
    }
  });

  const addAnchorFor = (platformValue, platformName) => {
    return platformValue ? (
      <span>
        <Typography
          component="span"
          variant="body2"
          className={classes.inline}
          color="textPrimary"
        >
          <a href={platformValue}>{setIconFor(platformName)}</a>
        </Typography>
      </span>
    ) : null;
  };

  const setIconFor = platformName => {
    switch (platformName) {
      case "facebook":
        return <FacebookIcon fontSize="small" />;
      case "twitter":
        return <TwitterIcon fontSize="small" />;
      case "linkedIn":
        return <LinkedInIcon fontSize="small" />;
      case "email":
        return <MailIcon color="primary" fontSize="small" />;
      default:
        return null;
    }
  };

  return (
    <List className={classes.root}>
      {state.Attendees.map(person => {
        return (
          <div key={person.ID}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <UserAvatar size="48" name={person.NAME} />
              </ListItemAvatar>
              <ListItemText
                primary={person.NAME}
                secondary={
                  <div>
                    <span>
                      {person.TITLE}
                      <span>,{person.COMPANY}</span>{" "}
                    </span>
                    <div>{person.BIO} </div>
                    <div>
                      {addAnchorFor(person.EMAIL, "email")}
                      {addAnchorFor(person.FACEBOOK, "facebook")}
                      {addAnchorFor(person.TWITTER, "twitter")}
                      {addAnchorFor(person.LINKEDIN, "linkedIn")}
                    </div>
                  </div>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />{" "}
          </div>
        );
      })}
    </List>
  );
}
