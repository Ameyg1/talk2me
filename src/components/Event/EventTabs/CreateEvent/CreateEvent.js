import React from "react";
import CreateEventForm from "./CreateEventForm";

export default class CreateEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="create-event-container">
        <CreateEventForm onCompletion={this.props.onCompletion} />
      </div>
    );
  }
}
