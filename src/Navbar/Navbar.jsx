import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Navbar.scss';
import logo from '../Logo.jpeg';

function Navbar() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    // Hier rufen wir die Benutzerdaten ab, um den eingeloggten Benutzer zu ermitteln
    axios.get('https://users-8a52.onrender.com/users')
      .then(response => {
        const users = response.data;
        const loggedInUser = users.find(user => user.loggedIn);
        if (loggedInUser) {
          setLoggedInUser(loggedInUser);
        }
      })
      .catch(error => {
        console.error('Fehler beim Abrufen des eingeloggten Benutzers: ', error);
      });
  }, []);

  const handleLogout = () => {
    // Hier kannst du den Logout-Code einfügen, um loggedIn auf false zu setzen
    // und den Benutzer zur Login-Seite weiterzuleiten
    axios.put(`https://users-8a52.onrender.com/users/${loggedInUser.id}`, {
      ...loggedInUser,
      loggedIn: false,
    })
      .then(() => {
        setLoggedInUser(null); // Den eingeloggten Benutzer im State entfernen
        window.location = '/login'; // Zur Login-Seite weiterleiten
      })
      .catch(error => {
        console.error('Fehler beim Ausloggen: ', error);
      });
  };

  return (
    <div className='navbar'>
      <div className='logo-container'>
        <div className='version-label'>V.2.1</div>
        <img src={logo} alt="Restwert" />
        <ul className='links'>
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
            <Link to="/symbole">Symbole</Link>
          </li>

          {loggedInUser ? (
            <>
              <li>
                <Link to="/admins">Admins</Link>
              </li>
              <li>
                <Link to="/tagesplanung">Tagesplanung</Link>
              </li>
              <li>
                <Link to="/interner-verkauf">Interner Verkauf</Link>
              </li>
              <li>
                <span>{loggedInUser.username}</span>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
