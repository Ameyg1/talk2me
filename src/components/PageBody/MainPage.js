import React from "react";
import { BrowserRouter as Switch, Route } from "react-router-dom";
import RegistrationForm from "../Registration/register";
import UserList from "../userlist";

export default class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventid: this.props.withEventId
    };
  }
  setEventId = async () => {
    await this.setState({ eventid: this.props.withEventId });
  };
  render() {
    return (
      <Switch>
        <Route exact path="/">
          <UserList eventid={this.props.withEventId} />
        </Route>
        <Route path="/profile">
          <RegistrationForm eventid={this.props.withEventId} />
        </Route>
      </Switch>
    );
  }
}
