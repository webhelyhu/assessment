import React, { Fragment } from 'react';

import EditUserForm from './EditUserForm'

const EditUser = ({ match }) => {
  return (
    <Fragment>
      <h1 className='large text-primary'>Edit user</h1>
      <p className='lead'>
        Edit existing user's data
    </p>
      <div className='profiles'>
        <EditUserForm id={match.params.id} />
      </div>
    </Fragment>
  );
};

export default EditUser;
