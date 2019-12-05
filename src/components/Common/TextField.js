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

  renderInputOfType(type) {
    if (this.props.type === "textarea") {
      return (
        <textarea
          value={this.props.value}
          rows="6"
          name={this.props.fieldName}
          id={this.props.fieldName}
          className={this.props.className}
          onChange={this.props.onChange}
        />
      );
    } else {
      return (
        <input
          type={this.props.type}
          value={this.props.value}
          name={this.props.fieldName}
          id={this.props.fieldName}
          className={this.props.className}
          onChange={this.props.onChange}
        />
      );
    }
  }

  render() {
    return (
      <div>
        <label>
          {this.props.fieldTitle}
          {this.renderInputOfType(this.props.type)}
        </label>
        {this.renderHelpMessage()}
        <span className="required-field" style={this.props.style}>
          {this.props.errorMessage}
        </span>
      </div>
    );
  }
}
