import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import UserAvatar from 'react-user-avatar';
import Typography from '@material-ui/core/Typography';
import LanguageIcon from '@material-ui/icons/Language';
import axios from 'axios';
import PhoneIcon from '@material-ui/icons/Phone';
import { flexbox } from '@material-ui/system';
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 'auto',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));
const initialState = {
  users: []
};

export default function AlignItemsList() {
  const classes = useStyles();
  const [state, setState] = useState(initialState);
  useEffect(() => {
      if(state.users.length <= 0) {
        axios.get("https://jsonplaceholder.typicode.com/users").then((response) => {
            console.log(JSON.stringify(response));
            setState( {
                users: response.data
              });
        });
      }
  });

  return (
    <List className={classes.root}>
      {state.users.map(user => 
        (<div key={user.id}><ListItem alignItems="flex-start">
        <ListItemAvatar>
          <UserAvatar size="48" name={user.name} colors={['#ccc', '#fafafa', '#ccaabb']}/>
        </ListItemAvatar>
        <ListItemText
          primary={user.name}
          secondary={
              <div>
            <span>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                <LanguageIcon fontSize="small"/>
                <a href="${user.website}">{user.website}</a>
              </Typography>
              
              </span>
              <span>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                <PhoneIcon fontSize="small"/>
                {user.phone}
              </Typography>
              
              </span>

            </div>
          }
          
        />
      </ListItem>
      
      <Divider variant="inset" component="li" /></div>))}
    </List>
  );
}
