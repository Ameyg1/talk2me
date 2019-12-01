import React from "react";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import EventIcon from "@material-ui/icons/Event";
import MoreIcon from "@material-ui/icons/MoreVert";
import MenuItem from "@material-ui/core/MenuItem";

class MenuOption extends React.Component {
  refreshPage = () => {
    window.parent.location.replace(
      "https://master.d2ymg4og9qeqjh.amplifyapp.com/" + this.props.renderLink
    );
  };

  renderIcon = option => {
    switch (option) {
      case "Profile":
        return <AccountCircle />;
      case "Events":
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
      return <MenuItem>{this.renderMenuOption()}</MenuItem>;
    } else {
      return this.renderMenuOption();
    }
  };

  render() {
    return <div>{this.renderMenu(this.props.device)}</div>;
  }
}

export default MenuOption;
