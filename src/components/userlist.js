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
import MailIcon from '@material-ui/icons/Mail';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
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
  Person: [],
};

export default function AlignItemsList() {
  const classes = useStyles();
  const [state, setState] = useState(initialState);
  useEffect(() => {
      if(state.Person.length <= 0) {
        axios.get("https://talk2meapp.azurewebsites.net/api/talktome").then((response) => {
            console.log(JSON.stringify(response.data.attendees));
            setState( {
                Person: response.data.attendees
              });
        });
      }
  });

  return (
    <List className={classes.root}>
      {
      
      state.Person.map(person => {
          console.log(state.Person);
          return (<div key={person.id}><ListItem alignItems="flex-start">
        <ListItemAvatar>
          <UserAvatar size="48" name={person.name} />
        </ListItemAvatar>
        <ListItemText
          primary={person.name}
          secondary= {<div><span>{person.title}<span>,{person.comany}</span> </span> 
          <div>{person.lookingfor} </div>
              <div>
            <span>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                <a href="mailto://${person.email}"><MailIcon color ="primary" fontSize="small"/></a>
              </Typography>
              
              </span>
              
              <span>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                <a href={person.facebook}><FacebookIcon fontSize="small"/></a>
              </Typography>
              
              </span>
              <span>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
               <a href={person.twitter}> <TwitterIcon fontSize="small"/> </a>
               
              </Typography>
              
              </span>
              <span>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                <a href={person.linkedin}><LinkedInIcon fontSize="small"/></a>
                
              </Typography>
              
              </span>
              
</div>

            </div>
            }
          
        />
      </ListItem>
      
      <Divider variant="inset" component="li" /> </div>)})}
    </List>
  );
}
