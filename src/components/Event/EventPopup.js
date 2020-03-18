import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import EnterEvent from "./EventTabs/EnterEvent/EnterEvent";
import "../../config/stylesheets/defaults/Popup.css";
import "../../config/stylesheets/defaults/Tabs.css";
import "../../config/stylesheets/customisables/colors.css";
import CreateEvent from "./EventTabs/CreateEvent/CreateEvent";

export default class EventPopUp extends React.Component {
  render() {
    return (
      <div className="popup">
        <div className="popup_inner">
          <Tabs style={{ height: "90%", width: "100%" }}>
            <TabList className="tab-list">
              <Tab className="tab-button">Join Event</Tab>
              <Tab className="tab-button">Create Event</Tab>
            </TabList>
            <TabPanel className="tab-panel">
              <EnterEvent onCompletion={this.props.closePopup} />
            </TabPanel>
            <TabPanel className="tab-panel">
              <CreateEvent onCompletion={this.props.closePopup} />
            </TabPanel>
          </Tabs>
        </div>
      </div>
    );
  }
}
