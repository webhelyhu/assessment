import React from 'react';

import EditUserForm from './EditUserForm'

const EditUser = ({ match }) => {
  return (
    <section className="edit-user">
      <h1 className='large text-primary'>Edit user</h1>
      <p className='lead'>
        Edit existing user's data
    </p>
      <div className='profiles'>
        <EditUserForm id={match.params.id} />
      </div>
    </section>
  );
};

export default EditUser;
