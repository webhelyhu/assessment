import React, { Fragment } from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import Spinner from '../layout/Spinner';
import UsersTable from './UsersgridTable'

const Usersgrid = () => {
  console.log('Usersgrid returning.')
  return (
    <Fragment>
      <div>
        <h1 className='large text-primary'>Users</h1>
        <p className='lead'>
          <i className='fab fa-users' /> See the list of users
          </p>
        <div className='profiles'>
          <UsersTable />
        </div>
      </div>
    </Fragment>
  );
};

export default Usersgrid;
