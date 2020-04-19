import React from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import Spinner from '../layout/Spinner';
import UsersTable from '../usersgrid/UsersgridTable'
import EditUserForm from '../EditUser/EditUserForm'
import naplo from '../../utils/naplo'

const MultiUser = () => {
  naplo('Usersgrid returning.')
  return (
    <div className="multi-user">
      <div>
        <h1 className='large text-primary'>Pumpkin multieditor</h1>
        <p className='lead'>
          Click First Name to see details. Click status icon to change status.
          </p>
        <input type='button' value="Add new" readOnly className='multi-button' />
        <div className='usereditor'>
          <EditUserForm />
        </div>
        <div className='userstable'>
          <UsersTable />
        </div>
      </div>
    </div>
  );
};

export default MultiUser;
