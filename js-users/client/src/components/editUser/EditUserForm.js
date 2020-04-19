import React, { Fragment, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import naplo from '../../utils/naplo'
import Spinner from '../layout/Spinner';
import { updateUser, getUserById, updateFormUser, createUser } from '../../actions/user';

const EditUserForm = ({ updateUser, createUser, getUserById, updateFormUser, user: { user, loadingUser, error }, history, match }) => {
  //
  // if the user has .id, => we are called to edit the user. If not, we are called to create new user.
  // if getUserById receives no argument, will reset user.user to default. 
  //
  useEffect(() => {
    // if match.params.id === undefined and user.id !== undefined ===> we just saved a new user
    getUserById(match.params.id);
  }, [getUserById, match.params.id, user.id]);

  return (
    <Fragment>
      {naplo('EditUserForm for user', user, '. loadingUser is', loadingUser)}
      {loadingUser ? (
        <Spinner />
      ) : (
          <Fragment>
            <small>* = required field</small>
            <form
              className='form'
              onSubmit={e => {
                e.preventDefault();
                user.id ? updateUser(user, history) : createUser(user, history);
              }}
            >
              <div className='form-group'>
                <input
                  type='text'
                  placeholder='* First Name'
                  name='first_name'
                  value={user.first_name}
                  onChange={e => updateFormUser({ [e.target.name]: e.target.value })}
                // required
                />
                {error.first_name &&
                  error.first_name.map(err => (
                    <p key={1 + Math.random()} className="field-error">Error: {err}</p>
                  ))
                }
              </div>
              <div className='form-group'>
                <input
                  type='text'
                  placeholder='* Last Name'
                  name='last_name'
                  value={user.last_name}
                  onChange={e => updateFormUser({ [e.target.name]: e.target.value })}
                />
                {error.last_name &&
                  error.last_name.map(err => (
                    <p key={1 + Math.random()} className="field-error">Error: {err}</p>
                  ))
                }
              </div>
              <div className='form-group'>
                {/* <select
                  name="status"
                  id="select-status"
                  value={user.status}
                  onChange={e => updateFormUser({ [e.target.name]: e.target.value })}
                >
                  <option value="active">Active</option>
                  <option value="locked">Locked</option>
                </select> */}
              </div>
              <input type='submit' value="Submit" readOnly className='btn btn-primary my-1' />
              <Link className='btn btn-light my-1' to='/users'>
                Users
        </Link>
            </form>
          </Fragment>
        )}
    </Fragment>
  );
};

EditUserForm.propTypes = {
  updateUser: PropTypes.func.isRequired,
  createUser: PropTypes.func.isRequired,
  getUserById: PropTypes.func.isRequired,
  updateFormUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  { updateUser, createUser, getUserById, updateFormUser }
)(withRouter(EditUserForm));
