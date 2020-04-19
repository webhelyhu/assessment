import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1 className='x-large'>Pumpkin</h1>
          <p className='lead'>
            the User Management Accelerator
          </p>
          <div className='buttons'>
            <Link to='/users' className='btn btn-primary'>
              See Users
            </Link>
            <Link to='/new' className='btn btn-light'>
              New User
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
