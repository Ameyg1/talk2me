import React from "react";
import { BrowserRouter as Switch, Route } from "react-router-dom";
import RegistrationForm from "../Registration/register";
import UserList from "../userlist";

export default class Page extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/">
          <UserList />
        </Route>
        <Route path="/profile">
          <RegistrationForm />
        </Route>
      </Switch>
    );
  }
}
