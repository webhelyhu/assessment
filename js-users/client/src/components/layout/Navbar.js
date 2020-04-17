import React from 'react';
import { NavLink } from 'react-router-dom';

import './Navbar.css'

const Navbar = () => {
  return (
    <nav className='navbar bg-dark'>
      <h1>
        <NavLink to='/'>
          <i className='fas fa-users' /> DN Users
        </NavLink>
      </h1>
      <ul>
        <li>
          <NavLink activeClassName="activepagelink" to='/users'>Users</NavLink>
        </li>
        <li>
          <NavLink activeClassName="activepagelink" to='/usersgrid'>Usersgrid</NavLink>
        </li>
        <li>
          <NavLink activeClassName="activepagelink" to='/adduser'>Add User</NavLink>
        </li>
        <li>
          <NavLink activeClassName="activepagelink" to='/register'>Register</NavLink>
        </li>
        <li>
          <NavLink activeClassName="activepagelink" to='/login'>Login</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
