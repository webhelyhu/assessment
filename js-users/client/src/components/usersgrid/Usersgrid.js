import React from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import Spinner from '../layout/Spinner';
import UsersTable from './UsersgridTable'
import naplo from '../../utils/naplo'

const Usersgrid = () => {
  naplo('Usersgrid returning.')
  return (
    <div className="show-users">
      <div>
        <h1 className='large text-primary'>Users</h1>
        <p className='lead'>
          Click First Name to see details. Click status icon to change status.
          </p>
        <div className='profiles'>
          <UsersTable />
        </div>
      </div>
    </div>
  );
};

export default Usersgrid;
