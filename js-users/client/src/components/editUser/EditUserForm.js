import React, { Fragment, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Spinner from '../layout/Spinner';
import { updateUser, getUserById, updateFormUser } from '../../actions/user';

const EditUserForm = ({ updateUser, getUserById, updateFormUser, user: { user, loading }, history, match }) => {

  const nullUser = !user;
  useEffect(() => {
    getUserById(match.params.id);
  }, [getUserById, match.params.id, nullUser]);


  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
          <Fragment>
            <h1 className='large text-primary'>Edit User</h1>
            <p className='lead'>
              <i className='fas fa-code-branch' />Make your changes!
            </p>
            <small>* = required field</small>
            <form
              className='form'
              onSubmit={e => {
                e.preventDefault();
                updateUser(user, history);
              }}
            >
              <div className='form-group'>
                <input
                  type='text'
                  placeholder='* First Name'
                  name='first_name'
                  value={user.first_name}
                  onChange={e => updateFormUser({ [e.target.name]: e.target.value })}
                  required
                />
              </div>
              <div className='form-group'>
                <input
                  type='text'
                  placeholder='* Last Name'
                  name='last_name'
                  value={user.last_name}
                  onChange={e => updateFormUser({ [e.target.name]: e.target.value })}
                  required
                />
              </div>
              <div className='form-group'>
                <select
                  name="status"
                  id="select-status"
                  value={user.status}
                  onChange={e => updateFormUser({ [e.target.name]: e.target.value })}
                >
                  <option value="active">Active</option>
                  <option value="locked">Locked</option>
                </select>
              </div>
              <input type='submit' className='btn btn-primary my-1' />
              <Link className='btn btn-light my-1' to='/'>
                Homepage
        </Link>
            </form>
          </Fragment>
        )}
    </Fragment>
  );
};

EditUserForm.propTypes = {
  updateUser: PropTypes.func.isRequired,
  getUserById: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { updateUser, getUserById, updateFormUser }
)(withRouter(EditUserForm));
