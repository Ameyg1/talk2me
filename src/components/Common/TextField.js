import React from "react";
import "../Registration/register.css";

export default class KTextField extends React.Component {
  renderHelpMessage() {
    if (this.props.helpMessage && this.props.helpMessageStyle) {
      return (
        <span className="note" style={this.props.helpMessageStyle}>
          {this.props.helpMessage}
        </span>
      );
    }
  }

  render() {
    return (
      <div>
        <label>
          {this.props.fieldTitle}
          <input
            type={this.props.type}
            value={this.props.value}
            name={this.props.fieldName}
            id={this.props.fieldName}
            className={this.props.className}
            onChange={this.props.onChange}
          />
        </label>
        {this.renderHelpMessage()}
        <span className="required-field" style={this.props.style}>
          {this.props.errorMessage}
        </span>
      </div>
    );
  }
}
