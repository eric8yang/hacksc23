import React from 'react';
import './navbar.css';
import './button.css';
import Auth from './auth';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <button onClick={Auth}>Sign In</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;