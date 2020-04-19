import React, { Fragment } from 'react';

import EditUserForm from './EditUserForm'

const EditNewUser = ({ match }) => {
  return (
    <Fragment>
      <h1 className='large text-primary'>New user</h1>
      <p className='lead'>
        Edit existing user's data
    </p>
      <div className='profiles'>
        <EditUserForm />
      </div>
    </Fragment>
  );
};

export default EditNewUser;
