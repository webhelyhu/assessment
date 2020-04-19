import React from 'react';

import EditUserForm from './EditUserForm'

const EditNewUser = ({ match }) => {
  return (
    <div className="edit-new-user">
      <h1 className='large text-primary'>New user</h1>
      <p className='lead'>
        Creating new user
      </p>
      <div className='profiles'>
        <EditUserForm />
      </div>
    </div>
  );
};

export default EditNewUser;
