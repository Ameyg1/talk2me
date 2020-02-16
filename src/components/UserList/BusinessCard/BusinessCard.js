import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import UserAvatar from "react-user-avatar";
import Typography from "@material-ui/core/Typography";
import MailIcon from "@material-ui/icons/Mail";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import { makeStyles } from "@material-ui/core/styles";

export default class BusinessCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false
    };
  }

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
          style={{ paddingRight: "8px", paddingTop: "5px" }}
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
  renderCollapsedBusinessCard() {
    return (
      <div>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <UserAvatar size="48" name={this.props.details.NAME} />
          </ListItemAvatar>
          <ListItemText
            primary={this.props.details.NAME}
            secondary={
              <label>
                <span>
                  {this.props.details.TITLE}
                  <span>
                    {this.props.details.COMPANY
                      ? ", " + this.props.details.COMPANY
                      : null}
                  </span>
                </span>
              </label>
            }
          />
        </ListItem>
      </div>
    );
  }
  renderExpandedBusinessCard() {
    return (
      <div>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <UserAvatar size="48" name={this.props.details.NAME} />
          </ListItemAvatar>
          <ListItemText
            primary={this.props.details.NAME}
            secondary={
              <label>
                <span>
                  {this.props.details.TITLE}
                  <span>
                    {this.props.details.COMPANY
                      ? ", " + this.props.details.COMPANY
                      : null}
                  </span>
                </span>
                <label>{this.props.details.BIO}</label>
                <label>
                  {this.addAnchorFor(this.props.details.EMAIL, "email")}
                  {this.addAnchorFor(this.props.details.FACEBOOK, "facebook")}
                  {this.addAnchorFor(this.props.details.TWITTER, "twitter")}
                  {this.addAnchorFor(this.props.details.LINKEDIN, "linkedIn")}
                </label>
              </label>
            }
          />
        </ListItem>
      </div>
    );
  }
  renderBusinessCard() {
    return this.state.isExpanded
      ? this.renderExpandedBusinessCard()
      : this.renderCollapsedBusinessCard();
  }
  changeCardState = () => {
    this.setState(prevState => ({
      isExpanded: !prevState.isExpanded
    }));
  };

  render() {
    return (
      <div
        className="business-card-container"
        onClick={this.changeCardState.bind()}
      >
        {this.renderBusinessCard()}
      </div>
    );
  }
}
