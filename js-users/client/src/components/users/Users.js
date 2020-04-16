import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import UserItem from './UserItem';
import { getUsers } from '../../actions/user';

const Users = ({ getUsers, user: { users, loading } }) => {
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
          <Fragment>
            <h1 className='large text-primary'>Users</h1>
            <p className='lead'>
              <i className='fab fa-connectdevelop' /> See the list of users
          </p>
            <div className='profiles'>  {/* fixme  pagination*/}
              {users.length > 0 ? (
                users.map(user => (
                  <UserItem key={user.id} user={user} />
                ))
              ) : (
                  <h4>No users found...</h4>
                )}
            </div>
          </Fragment>
        )}
    </Fragment>
  );
};

Users.propTypes = {
  getUsers: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  { getUsers }
)(Users);
