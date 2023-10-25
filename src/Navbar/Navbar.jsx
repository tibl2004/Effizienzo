import React from 'react';
import { Link } from 'react-router-dom'; // Link-Komponente importieren
import logo from '../Logo.jpeg';
import './Navbar.scss';

function Navbar() {
  return (
    <div className='navbar'>
      <div className='logo-container'>
        <div className='version-label'>V.2.0</div>
        <img src={logo} alt="Restwert" />
        <div className='links'>
          <li>
            <Link to="/Effizienzo">Home</Link>
          </li>
          <li>
            <Link to="/erfassen">Erfassen</Link>
          </li>
          <li>
            <Link to="/inserieren">Inserieren</Link>
          </li>
          <li>
            <Link to="/reaktivierung">Reaktivierung</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/admins">Admins</Link>
          </li>
          <li>
            <Link to="/tagesplanung">Tagesplanung</Link>
          </li>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
