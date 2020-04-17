import React, { Fragment } from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';

import AddUserForm from './AddUserForm'

// createUser needs formData (data of the new object) and history.

const AddUser = () => {
  return (
    <Fragment>
      <h1 className='large text-primary'>Add a new user</h1>
      <p className='lead'>
        Here you can add a new user
    </p>
      <div className='profiles'>
        <AddUserForm />
      </div>
    </Fragment>
  );
};

export default AddUser;
