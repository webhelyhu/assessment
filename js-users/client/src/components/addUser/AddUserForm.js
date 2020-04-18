import React, { Fragment, useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createUser } from '../../actions/user';

const AddUserForm = ({ createUser, history, user: { error } }) => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    status: 'active'
  });

  const {
    first_name,
    last_name
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <h1 className='large text-primary'>Add New User</h1>
      <p className='lead'>
        <i className='fas fa-code-branch' /> extra text about adding user
      </p>
      <small>* = required field</small>
      <form
        className='form'
        onSubmit={e => {
          e.preventDefault();
          createUser(formData, history);
        }}
      >
        <div className='form-group'>
          <input
            type='text'
            placeholder='* First Name'
            name='first_name'
            value={first_name}
            onChange={e => onChange(e)}
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
            value={last_name}
            onChange={e => onChange(e)}
          />
        </div>
        <input type='submit' className='btn btn-primary my-1' />
      </form>
    </Fragment>
  );
};

AddUserForm.propTypes = {
  createUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  { createUser }
)(withRouter(AddUserForm));
