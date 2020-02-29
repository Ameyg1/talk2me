import React, { Component } from "react";
import "../../config/stylesheets/defaults/Select.css";

export default class Select extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleChange = event => {
    let selectedValue = event.target.value;
    this.props.onSelectChange(selectedValue);
  };

  render() {
    let arrayOfData = this.props.arrayOfData;
    let options = arrayOfData.map(data => {
      return (
        <option className="select-option" key={data.id} value={data.id}>
          {data.name}
        </option>
      );
    });

    return (
      <div className="select-container">
        <label>{this.props.fieldTitle}</label>
        <select
          name="customSearch"
          className="select-selected"
          onChange={this.handleChange}
        >
          {options}
        </select>
      </div>
    );
  }
}
