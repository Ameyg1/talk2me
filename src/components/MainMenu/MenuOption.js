import React from "react";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import EventIcon from "@material-ui/icons/Event";
import MoreIcon from "@material-ui/icons/MoreVert";
import MenuItem from "@material-ui/core/MenuItem";
import env_variable from "../../Reusables/EnvironmentVariables";

class MenuOption extends React.Component {
  refreshPage = () => {
    window.parent.location.replace(
      env_variable.PROD_URL + this.props.renderLink
    );
  };

  renderIcon = option => {
    switch (option) {
      case "Profile":
        return <AccountCircle />;
      case "UserList":
        return <EventIcon />;
      case "More":
        return <MoreIcon />;
      default:
        break;
    }
  };

  setDeviceType(device) {
    const menuId = "primary-search-account-menu";
    const mobileMenuId = "primary-search-account-menu-mobile";
    return device === "mobile" ? mobileMenuId : menuId;
  }

  renderMenuOption = () => {
    return (
      <IconButton
        edge="end"
        aria-label={this.props.label}
        aria-controls={this.setDeviceType(this.props.device)}
        aria-haspopup="true"
        color="inherit"
        onClick={this.refreshPage.bind(this)}
      >
        {this.renderIcon(this.props.type)}
      </IconButton>
    );
  };

  renderMenu = device => {
    if (device === "mobile") {
      return (
        <MenuItem>
          {this.renderMenuOption()}
          <p>{this.props.titleText}</p>
        </MenuItem>
      );
    } else {
      return this.renderMenuOption();
    }
  };

  render() {
    return (
      <div onClick={this.refreshPage.bind(this)}>
        {this.renderMenu(this.props.device)}
      </div>
    );
  }
}

export default MenuOption;
