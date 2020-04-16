import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


const UserItem = ({
  user: {
    id,
    first_name,
    last_name,
    status,
    // created_at,
    // updated_at
  }
}) => {
  return (
    <div className='profile bg-light'>
      img
      <div>
        <h2>{last_name}, {first_name}</h2>
        <p>
          {status}
        </p>
        <Link to={`/users/${id}`} className='btn btn-primary'>
          View Profile
        </Link>
      </div>
    </div>
  );
};

UserItem.propTypes = {
  user: PropTypes.object.isRequired
};

export default UserItem;
