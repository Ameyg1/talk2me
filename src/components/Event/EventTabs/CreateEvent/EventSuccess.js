import React from "react";
import "../../../Registration/register.css";

export default class EventSuccess extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <label>Event Sucess</label>
        <button
          className="sb-btn"
          type="submit"
          onClick={this.props.onCompletion}
        >
          SUBMIT
        </button>
      </div>
    );
  }
}
