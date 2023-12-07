import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './Profil.scss';
import axios from 'axios';

function Profil() {
  const [username, setUsername] = useState("");
  const [vorname, setVorname] = useState("");
  const [nachname, setNachname] = useState("");

  const handleLogout = async () => {
    try {
      const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')) || {};

      if (loggedInUser.id) {
        const updatedUser = { ...loggedInUser, loggedIn: false };
        await axios.put(`http://localhost:4000/users/${loggedInUser.id}`, updatedUser);

        localStorage.setItem('loggedIn', 'false');
        localStorage.removeItem('loggedInUser');
        window.location = "/";
      } else {
        console.error('User ID is undefined');
      }
    } catch (error) {
      console.error('Error during logout:', error);
      // Handle error as needed
    }
  };

  return (
    <div className="App">
      <div>
        <h1 className="profil">Profil</h1>
      </div>

      <table className='benutzerdaten'>
        <tbody>
          <tr>
            <td>Benutzername:</td>
            <td>{username}</td>
          </tr>
          <tr>
            <td>Vorname:</td>
            <td>{vorname}</td>
          </tr>
          <tr>
            <td>Name:</td>
            <td>{nachname}</td>
          </tr>
        </tbody>
      </table>

      <ul>
        <li>
          <button className="logout" onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} />
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Profil;
