import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import EventIcon from "@material-ui/icons/Event";
import ChatIcon from "@material-ui/icons/Chat";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

const useStyles = makeStyles({
  root: {
    width: "auto"
  }
});

export default function SimpleBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction label="Event" icon={<EventIcon />} />
      <BottomNavigationAction label="Chat" icon={<ChatIcon />} />
      <BottomNavigationAction label="Profile" icon={<AccountCircleIcon />} />
    </BottomNavigation>
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
