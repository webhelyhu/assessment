import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Alert from '../layout/Alert';
import Profiles from '../profiles/Profiles';
import Users from '../users/Users';
import Usersgrid from '../usersgrid/Usersgrid';
import AddUser from '../addUser/AddUser'
import Profile from '../profile/Profile';
import NotFound from '../layout/NotFound';

const Routes = props => {
  return (
    <section className="container">
      <Alert />
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/profiles" component={Profiles} />
        <Route exact path="/profile/:id" component={Profile} />
        <Route exact path="/users" component={Users} />
        <Route exact path="/usersgrid" component={Usersgrid} />
        <Route exact path="/adduser" component={AddUser} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
