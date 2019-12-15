import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import EnterEvent from "./EventTabs/EnterEvent/EnterEvent";
import "./Popup.css";
import "../Common/Tabs.css";
import CreateEvent from "./EventTabs/CreateEvent/CreateEvent";

export default class EventPopUp extends React.Component {
  render() {
    return (
      <div className="popup">
        <div className="popup_inner">
          <Tabs>
            <TabList className="tab-list">
              <Tab className="tab-button">Enter Event</Tab>
              <Tab className="tab-button">Create Event</Tab>
            </TabList>
            <TabPanel className="tab-panel">
              <EnterEvent
                onCompletion={this.props.closePopup}
                eventId={this.props.eventId}
              />
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
