import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './Navbar.scss';
import logo from '../Logo.png';
import Clock from '../Clock/Clock';

function Navbar() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loggedInAdmin, setLoggedInAdmin] = useState(null);
  const currentPath = window.location.pathname; // Aktuelle URL-Pfad ermitteln

  useEffect(() => {
    // Hier rufen wir die Benutzerdaten ab, um den eingeloggten Benutzer zu ermitteln
    
  }, []);

  const handleLogout = () => {
    // Hier kannst du den Logout-Code einfügen, um loggedIn auf false zu setzen
    // und den Benutzer/Admin zur Login-Seite weiterzuleiten

   
   
  };

  return (
    <div className='navbar'>
      <div className='logo-container'>
        <div className='version-label'>V.4.9</div>
        <img src={logo} alt="Restwert" />
      </div>
      <Clock />
      <ul className='links'>
        <li>
          <Link to="/mainsite" className={currentPath === '/mainsite' ? 'active' : ''}>
            Home
          </Link>
        </li>

        <li>
          <Link to="/erfassen" className={currentPath === '/erfassen' ? 'active' : ''}>
            Erfassen
          </Link>
        </li>
        <li>
          <Link to="/kategorien" className={currentPath === '/kategorien' ? 'active' : ''}>
            Inserat Vorlagen
          </Link>
        </li>
       
        <li>
          <Link to="/reaktivierung" className={currentPath === '/reaktivierung' ? 'active' : ''}>
            Reaktivierung
          </Link>
        </li>
        <li>
          <Link to="/versand" className={currentPath === '/versand' ? 'active' : ''}>
            Versand
          </Link>
        </li>

        <li>
          <Link to="/feedback" className={currentPath === '/feedback' ? 'active' : ''}>
            Feedbacks
          </Link>
        </li>

        <li>
          <Link to="/admins/users" className={currentPath === '/admins/users' ? 'active' : ''}>
            Users
          </Link>
        </li>

        <li>
          <Link to="/admins" className={currentPath === '/admins' ? 'active' : ''}>
            Admins
          </Link>
        </li>












        <li>
          <Link to="/profil" className={currentPath.startsWith('/profil') ? 'active' : ''}>
            Profil
          </Link>
          <ul className="submenu">
            <li>
              <Link to="/profil/settings" className={currentPath === '/profil/settings' ? 'active' : ''}>
                Einstellungen
              </Link>
            </li>

          </ul>
        </li>





      </ul>
    </div>
  );
}

export default Navbar;
