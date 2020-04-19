import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Alert from '../layout/Alert';
import Usersgrid from '../usersgrid/Usersgrid';
import EditUser from '../editUser/EditUser'
import EditNewUser from '../editUser/EditNewUser'
import NotFound from '../layout/NotFound';
const Routes = props => {
  return (
    <section className="container-new">
      <Switch>
        <Route exact path="/edit/:id" component={EditUser} />
        <Route exact path="/edit/" component={EditNewUser} />
        <Route exact path="/new/" component={EditNewUser} />
        <Route exact path="/users" component={Usersgrid} />
        <Route component={NotFound} />
      </Switch>
      <Alert />
    </section>
  );
};

export default Routes;
