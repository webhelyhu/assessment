import React, { Fragment, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateUser, getUserById } from '../../actions/user';

const EditUserForm = ({ updataeUser, getUserById, user: { user }, history, match }) => {

  const nullUser = !user;
  useEffect(() => {
    getUserById(match.params.id);
  }, [getUserById, match.params.id, nullUser]);

  const {
    first_name,
    last_name,
    status
  } = user;

  // const onChange = e =>
  //   setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <h1 className='large text-primary'>Edit User</h1>
      <p className='lead'>
        <i className='fas fa-code-branch' /> extra text
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
            onChange={e => user[e.target.name] = e.target.value}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Last Name'
            name='last_name'
            value={last_name}
            onChange={e => user[e.target.name] = e.target.value}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Status (active or locked)'
            name='status'
            value={status}
            onChange={e => user[e.target.name] = e.target.value}
            required
          />
        </div>
        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Homepage
        </Link>
      </form>
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
  { updateUser, getUserById }
)(withRouter(EditUserForm));
