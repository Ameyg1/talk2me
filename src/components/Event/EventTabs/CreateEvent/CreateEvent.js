import React from "react";
import CreateEventForm from "./CreateEventForm";
import EventSuccess from "./EventSuccess";
import ShareEvent from "./ShareEvent";

export default class CreateEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCreateEventFormDisplayed: true,
      isEventSuccessDisplayed: false,
      isShareEventDisplayed: false
    };
  }
  handlePageNavigation = () => {
    if (this.state.isCreateEventFormDisplayed) {
      this.setState({
        isCreateEventFormDisplayed: false,
        isEventSuccessDisplayed: true,
        isShareEventDisplayed: false
      });
    } else if (this.state.isEventSuccessDisplayed) {
      this.setState({
        isCreateEventFormDisplayed: false,
        isEventSuccessDisplayed: false,
        isShareEventDisplayed: true
      });
    } else {
      this.setState({
        isCreateEventFormDisplayed: true,
        isEventSuccessDisplayed: false,
        isShareEventDisplayed: false
      });
    }
  };
  render() {
    return (
      <div className="create-event-container">
        {this.state.isCreateEventFormDisplayed ? (
          <CreateEventForm
            onCompletion={this.handlePageNavigation.bind(this)}
          />
        ) : null}
        {this.state.isEventSuccessDisplayed ? (
          <EventSuccess onCompletion={this.handlePageNavigation.bind(this)} />
        ) : null}
        {this.state.isShareEventDisplayed ? (
          <ShareEvent onCompletion={this.handlePageNavigation.bind(this)} />
        ) : null}
      </div>
    );
  }
}
