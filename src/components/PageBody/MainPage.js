import React from "react";
import { BrowserRouter as Switch, Route } from "react-router-dom";
import RegistrationForm from "../Registration/register";
import UsersList from "../UserList/UsersList";

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
          <UsersList eventid={this.props.withEventId} />
        </Route>
        <Route path="/profile">
          <RegistrationForm />
        </Route>
      </Switch>
    );
  }
}
