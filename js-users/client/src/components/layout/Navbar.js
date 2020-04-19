import React from 'react';
import { NavLink } from 'react-router-dom';

import './Navbar.css'

const Navbar = () => {
  return (
    <nav className='navbar bg-dark'>
      <h1>
        <NavLink to='/' className="navbar-logo-link">
          <img src="/favicon-32x32.png" className="navbar-logo" alt="Pumpkin logo" /> Pumpkin
        </NavLink>
      </h1>
      <ul>
        <li>
          <NavLink activeClassName="activepagelink" to='/users'>Users</NavLink>
        </li>
        <li>
          <NavLink activeClassName="activepagelink" to='/new'>New User</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
