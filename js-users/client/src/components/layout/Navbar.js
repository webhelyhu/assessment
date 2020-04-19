import React from 'react';
import { NavLink } from 'react-router-dom';

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
          <NavLink activeClassName="navbar-activepagelink" to='/users'>Users</NavLink>
        </li>
        <li>
          <NavLink activeClassName="navbar-activepagelink" to='/new'>New User</NavLink>
        </li>
        <li>
          <NavLink activeClassName="navbar-activepagelink" to='/multi'>Multi</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
