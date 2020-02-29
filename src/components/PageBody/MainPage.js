import React from "react";
import { BrowserRouter as Switch, Route } from "react-router-dom";
import RegistrationForm from "../Registration/register";
import UsersList from "../UserList/UsersList";
import Admin from "../Admin/Admin";

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
          <UsersList />
        </Route>
        <Route path="/profile">
          <RegistrationForm />
        </Route>
        <Route path="/admin">
          <Admin />
        </Route>
      </Switch>
    );
  }
}
