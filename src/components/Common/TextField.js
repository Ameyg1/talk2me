import React from "react";
import "../Registration/register.css";

export default class KTextField extends React.Component {
  renderHelpMessage() {
    if (this.props.helpMessage) {
      return (
        <span className="note" style={{ display: "block" }}>
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
    } else if (this.props.type === "socialLink") {
      return (
        <label className="textfield">
          <label className="prefieldLink">{this.props.prefieldInfo}</label>
          <input
            type={this.props.type}
            value={this.props.value}
            name={this.props.fieldName}
            id="socialTextField"
            className={this.props.className}
            onChange={this.props.onChange}
          />
        </label>
      );
    } else if (this.props.type === "embeddedButton") {
      return (
        <label className="textfield">
          <input
            type={this.props.type}
            value={this.props.value}
            name={this.props.fieldName}
            id="textFieldOnTheLeft"
            className={this.props.className}
            onChange={this.props.onChange}
          />
          <button
            className="embeddedButton"
            type="submit"
            onClick={this.props.onButtonClick}
          >
            {this.props.embeddedButtonInfo}
          </button>
        </label>
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
        <label>{this.props.fieldTitle}</label>
        {this.renderInputOfType(this.props.type)}
        {this.renderHelpMessage()}
        <span className="required-field" style={this.props.style}>
          {this.props.errorMessage}
        </span>
      </div>
    );
  }
}
