import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Alert from '../layout/Alert';
import Users from '../users/Users';
import Usersgrid from '../usersgrid/Usersgrid';
import AddUser from '../addUser/AddUser'
import EditUser from '../editUser/EditUser'
import NotFound from '../layout/NotFound';

const Routes = props => {
  return (
    <section className="container">
      <Alert />
      <Switch>
        <Route exact path="/edit/:id" component={EditUser} />
        <Route exact path="/rawusers" component={Users} />
        <Route exact path="/users" component={Usersgrid} />
        <Route exact path="/new" component={AddUser} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
