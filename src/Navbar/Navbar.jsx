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

    // Hier rufen wir die Admins-Daten ab, um den eingeloggten Admin zu ermitteln
    axios.get('https://users-8a52.onrender.com/admins')
      .then(response => {
        const admins = response.data;
        const loggedInAdmin = admins.find(admin => admin.loggedIn);
        if (loggedInAdmin) {
          setLoggedInAdmin(loggedInAdmin);
        }
      })
      .catch(error => {
        console.error('Fehler beim Abrufen des eingeloggten Admins: ', error);
      });
  }, []);

  const handleLogout = () => {
    // Hier kannst du den Logout-Code einfügen, um loggedIn auf false zu setzen
    // und den Benutzer/Admin zur Login-Seite weiterzuleiten

    if (loggedInUser) {
      axios.put(`https://users-8a52.onrender.com/users/${loggedInUser.id}`, {
        ...loggedInUser,
        loggedIn: false,
      })
        .then(() => {
          setLoggedInUser(null); // Den eingeloggten Benutzer im State entfernen
          window.location = '/'; // Zur Login-Seite weiterleiten
        })
        .catch(error => {
          console.error('Fehler beim Ausloggen des Benutzers: ', error);
        });
    }

    if (loggedInAdmin) {
      axios.put(`https://users-8a52.onrender.com/admins/${loggedInAdmin.id}`, {
        ...loggedInAdmin,
        loggedIn: false,
      })
        .then(() => {
          setLoggedInAdmin(null); // Den eingeloggten Admin im State entfernen
          window.location = '/'; // Zur Login-Seite weiterleiten
        })
        .catch(error => {
          console.error('Fehler beim Ausloggen des Admins: ', error);
        });
    }
  };

  return (
    <div className='navbar'>
      <div className='logo-container'>
        <div className='version-label'>V.4.5</div>
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
          <Link to="/artikel" className={currentPath.startsWith('/artikel') ? 'active' : ''}>
            Artikel
          </Link>
          <ul className="submenu">
            <li>
              <Link to="/artikel/erfassen" className={currentPath === '/artikel/erfassen' ? 'active' : ''}>
                Erfassen
              </Link>
            </li>
            <li>
              <Link to="/artikel/inserieren" className={currentPath === '/artikel/inserieren' ? 'active' : ''}>
                Inserieren
              </Link>
            </li>
            <li>
              <Link to="/artikel/schluss" className={currentPath === '/artikel/schluss' ? 'active' : ''}>
                Schluss
              </Link>
            </li>
            <li>
              <Link to="/artikel/reaktivierung" className={currentPath === '/artikel/reaktivierung' ? 'active' : ''}>
                Reaktivierung
              </Link>
            </li>
            
          </ul>
        </li>
        <li>
          <Link to="/symbole" className={currentPath === '/symbole' ? 'active' : ''}>
            Symbole
          </Link>
        </li>

        <li>
          <Link to="/nachbearbeitung" className={currentPath.startsWith('/nachbearbeitung') ? 'active' : ''}>
            Nachbearbeitung
          </Link>
          <ul className="submenu">
            <li>
              <Link to="/nachbearbeitung/bewertungen" className={currentPath === '/nachbearbeitung/bewertungen' ? 'active' : ''}>
                Bewertungen
              </Link>
            </li>
            <li>
              <Link to="/nachbearbeitung/controlling" className={currentPath === '/nachbearbeitung/controlling' ? 'active' : ''}>
                Controlling
              </Link>
            </li>
            
            
          </ul>
        </li>
        
        <li className='disabled-link'>
          <Link to="/chat" className={currentPath === '/chat' ? 'active' : ''}>
            Chat
          </Link>
        </li>
        <li className='disabled-link'>
          <Link to="/vorlagen" className={currentPath === '/vorlagen' ? 'active' : ''}>
            Vorlagen
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



        {
          /*
<li>
              <Link to="/artikel/versand" className={currentPath === '/artikel/versand' ? 'active' : ''}>
                Versand
              </Link>
            </li>


            <li>
          <Link to="/admins" className={currentPath.startsWith('/admins') ? 'active' : ''}>
            Admins
          </Link>
          <ul className="submenu">
            <li>
              <Link to="/admins/admincreate" className={currentPath === '/admins/admincreate' ? 'active' : ''}>
                Admin erstellen
              </Link>
            </li>
            <li>
              <Link to="/admins/tagesplanung" className={currentPath === '/artikel/tagesplanung' ? 'active' : ''}>
                Tagesplanung
              </Link>
            </li>
            <li>
              <Link to="/admins/interner-verkauf" className={currentPath === '/admins/interner-verkauf' ? 'active' : ''}>
                Interner Verkauf
              </Link>
            </li>
            <li>
              <Link to="/admins/users" className={currentPath === '/admins/users' ? 'active' : ''}>
                Benutzer
              </Link>
            </li>
            <li>
              <Link to="/admins/usercreate" className={currentPath === '/admins/usercreate' ? 'active' : ''}>
                Benutzer erstellen
              </Link>
            </li>

          </ul>
        </li>
  

             
       

        <li>
          <Link to="/users" className={currentPath === '/users' ? 'active' : ''}>
            Users
          </Link>
        </li>


        <li>
          <Link to="/admins" className={currentPath === '/admins' ? 'active' : ''}>
            Admins
          </Link>
        </li>
        <li>
          <Link to="/tagesplanung" className={currentPath === '/tagesplanung' ? 'active' : ''}>
            Tagesplanung
          </Link>
        </li>
        <li>
          <Link to="/interner-verkauf" className={currentPath === '/interner-verkauf' ? 'active' : ''}>
            Interner Verkauf
          </Link>
        </li>
          
          */
        }


      </ul>
    </div>
  );
}

export default Navbar;
