import React from 'react';
import { Link } from 'react-router-dom'; // Link-Komponente importieren
import logo from '../Logo.jpeg';
import './Navbar.scss';

function Navbar() {
  return (
    <div className='navbar'>
      <div className='logo-container'>
        <div className='version-label'>V.1.7 BETA</div>
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
        </div>
      </div>
    </div>
  );
}

export default Navbar;
