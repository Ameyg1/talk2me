import React from "react";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import EventIcon from "@material-ui/icons/Event";
import MoreIcon from "@material-ui/icons/MoreVert";

class MenuOption extends React.Component {
  refreshPage = () => {
    window.parent.location.replace(
      "http://localhost:3000" + this.props.renderLink
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

  render() {
    return (
      <div>
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
      </div>
    );
  }
}

export default MenuOption;
