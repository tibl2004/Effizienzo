import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import './Profil.scss';

function Profil() {
  const [userProfile, setUserProfile] = useState({
    name: 'Max Mustermann',
    email: 'max.mustermann@gewa.ch',
    password: '123',
    role: 'Benutzer',
    permissions: {
      erfassen: true,
      fotografieren: true,
      freigeben: false,
      inserieren: true,
      reaktivieren: false,
      bewertung: true,
      fragenMails: false,
      kreditoren: true,
      zahlungsabgleich1: true,
      zahlungsabgleich2: false,
      kasse: true,
      empfang: true,
      telefon: false,
      lager: true,
      paket: true,
      verkauf: false,
      nachbearbeitung: true,
      ricardoGebuehren: false,
    },
  });

  const handleLogout = () => {
    window.location = "/";
  };
  
  const togglePermission = (permission) => {
    const updatedPermissions = { ...userProfile.permissions, [permission]: !userProfile.permissions[permission] };
    setUserProfile({ ...userProfile, permissions: updatedPermissions });
  };

  return (
    <div className="App">
      <div>
        <h1 className="profil">Profil</h1>
      </div>

      <div className='profile-infos'>
        <h2>Profilinformationen</h2>
        <table>
          <tbody>
            <tr>
              <td className="property">Name:</td>
              <td className="value">{userProfile.name}</td>
            </tr>
            <tr>
              <td className="property">E-Mail:</td>
              <td className="value">{userProfile.email}</td>
            </tr>
            <tr>
              <td className="property">Passwort:</td>
              <td className="value">
                {userProfile.password}
              </td>
            </tr>
            <tr>
              <td className="property">Rolle:</td>
              <td className="value">{userProfile.role}</td>
            </tr>
            <tr>
              <td className="property">Berechtigungen:</td>
              <td className="value">
                <ul className="permissions-list">
                  {Object.keys(userProfile.permissions).map((permission) => (
                    <li key={permission}>
                      <input
                        type="checkbox"
                        id={permission}
                        checked={userProfile.permissions[permission]}
                        onChange={() => togglePermission(permission)}
                      />
                      <label htmlFor={permission}>
                        {userProfile.permissions[permission] ? (
                          <FontAwesomeIcon icon={faCheck} />
                        ) : (
                          <FontAwesomeIcon icon={faTimes} />
                        )}
                        {permission}
                      </label>
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
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
