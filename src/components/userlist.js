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
      axios.get("http://localhost:5000/api/attendees").then(response => {
        console.log(JSON.stringify(response.data.response));
        setState({
          Attendees: response.data.response
        });
      });
    }
  });

  return (
    <List className={classes.root}>
      {state.Attendees.map(person => {
        console.log(state.Attendees);
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
                      <span>
                        <Typography
                          component="span"
                          variant="body2"
                          className={classes.inline}
                          color="textPrimary"
                        >
                          <a href={`mailto:${person.EMAIL}`}>
                            <MailIcon color="primary" fontSize="small" />
                          </a>
                        </Typography>
                      </span>

                      <span>
                        <Typography
                          component="span"
                          variant="body2"
                          className={classes.inline}
                          color="textPrimary"
                        >
                          <a href={person.FACEBOOK}>
                            <FacebookIcon fontSize="small" />
                          </a>
                        </Typography>
                      </span>
                      <span>
                        <Typography
                          component="span"
                          variant="body2"
                          className={classes.inline}
                          color="textPrimary"
                        >
                          <a href={person.TWITTER}>
                            {" "}
                            <TwitterIcon fontSize="small" />{" "}
                          </a>
                        </Typography>
                      </span>
                      <span>
                        <Typography
                          component="span"
                          variant="body2"
                          className={classes.inline}
                          color="textPrimary"
                        >
                          <a href={person.LINKEDIN}>
                            <LinkedInIcon fontSize="small" />
                          </a>
                        </Typography>
                      </span>
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
