import React from "react";
import axios from "axios";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import TextField from "../Common/TextField.js";
import env_variable from "../../Reusables/EnvironmentVariables.js";
import { selectValues } from "../../Reusables/Constants.js";
import Select from "../Common/Select.js";

export default class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      NAME: "",
      EMAIL: "",
      COMPANY: "",
      ID: "",
      EVENT_ID: "",
      selectedField: "1 - Name",
      selectedFieldValue: "",
      Attendees: []
    };
  }

  getUsersList = async e => {
    e.preventDefault();
    if (this.isRequiredFieldsFilled()) {
      await this.setRequestBody();
      const user = {
        NAME: this.state.NAME,
        EMAIL: this.state.EMAIL,
        COMPANY: this.state.COMPANY,
        ID: this.state.ID
      };

      await axios
        .post(
          env_variable.BACKEND_URL +
            "/api/attendees/searchAttendee/" +
            this.state.EVENT_ID,
          user
        )
        .then(
          response => {
            this.resetState();
            this.setState({
              Attendees: response.data.response
            });
          },
          error => {
            console.log("TODO: Handle error");
          }
        );
    }
  };

  setRequestBody() {
    switch (this.state.selectedField) {
      case "1 - Name":
        this.setState({
          NAME: this.state.selectedFieldValue,
          EMAIL: "",
          COMPANY: "",
          ID: ""
        });
        break;
      case "2 - Email":
        this.setState({
          NAME: "",
          EMAIL: this.state.selectedFieldValue,
          COMPANY: "",
          ID: ""
        });
        break;
      case "3 - Company":
        this.setState({
          NAME: "",
          EMAIL: "",
          COMPANY: this.state.selectedFieldValue,
          ID: ""
        });
        break;
      case "4 - None":
        this.setState({
          NAME: "",
          EMAIL: "",
          COMPANY: "",
          ID: "*"
        });
        break;
      default:
        console.log("This should had never happenned");
        break;
    }
  }

  resetState() {
    this.setState({
      NAME: "",
      EMAIL: "",
      COMPANY: "",
      ID: "",
      EVENT_ID: "",
      selectedFieldValue: ""
    });
  }

  isRequiredFieldsFilled() {
    return this.state.EVENT_ID && this.isOptionalFieldsCorrect();
  }

  isOptionalFieldsCorrect() {
    if (this.state.selectedField === "All") {
      return true;
    } else {
      if (this.state.selectedFieldValue) {
        return true;
      }
      return false;
    }
  }

  renderSearchList(searchList) {
    if (searchList.length !== 0) {
      return (
        <List style={{ display: "inline" }}>
          {searchList.map(person => {
            return (
              <div key={person.ID}>
                {this.renderAttendeeCard(person)}
                <Divider variant="inset" component="li" />{" "}
              </div>
            );
          })}
        </List>
      );
    }
  }

  renderAttendeeCard(person) {
    if (person.ID) {
      return (
        <ListItem alignItems="flex-start">
          <ListItemText
            primary={person.NAME}
            secondary={
              <label>
                <span>
                  {person.TITLE}
                  <span>{person.COMPANY ? ", " + person.COMPANY : null}</span>
                </span>
              </label>
            }
          />
        </ListItem>
      );
    } else if (person.ID === 0) {
      return <div style={{ padding: "50px" }} />;
    }
  }

  handleSelectChange = selectedField => {
    this.setState({
      selectedField: selectedField
    });
  };

  handleTextChange = (e, name) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div
        className="admin-container"
        style={{ textAlign: "center", padding: "60px" }}
      >
        <TextField
          fieldTitle="Event ID"
          type="text"
          value={this.state.EVENT_ID}
          onChange={e => this.handleTextChange(e, "EVENT_ID")}
          fieldName="EVENT_ID"
        />
        <Select
          fieldTitle="Select by"
          arrayOfData={selectValues}
          onSelectChange={this.handleSelectChange}
        />
        <TextField
          fieldTitle="Value"
          type="text"
          value={this.state.selectedFieldValue}
          onChange={e => this.handleTextChange(e, "selectedFieldValue")}
          fieldName="selectedFieldValue"
        />
        <button
          type="submit"
          className="add-profile-button"
          onClick={e => this.getUsersList(e)}
          style={{ marginTop: "40px", marginLeft: "auto", marginRight: "auto" }}
        >
          Search
        </button>
        <div style={{ border: "solid black", marginTop: "30px" }}>
          {this.renderSearchList(this.state.Attendees)}
        </div>
        {/* <label>Test</label>
        <label>{this.state.EVENT_ID}</label>
        <label>{this.state.NAME}</label>
        <label>{this.state.EMAIL}</label>
        <label>{this.state.COMPANY}</label>
        <label>{this.state.ID}</label> */}
      </div>
    );
  }
}
