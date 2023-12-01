import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './Profil.scss'; // Stellen Sie sicher, dass der Import-Pfad zur CSS-Datei korrekt ist

function Profil() {

  const handleLogout = () => {
    window.location = "/";
  };

  return (
    <div className="App">
      <div>
        <h1 className="profil">Profil</h1>
      </div>
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
