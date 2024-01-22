import React, { useState } from 'react';
import './Login.scss';
import axios from 'axios';

function Login() {
  const [benutzername, setBenutzername] = useState('');
  const [password, setPassword] = useState('');
  const [loginAttempted, setLoginAttempted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginAttempted(true);

    try {
      const response = await axios.get('https://nodejs-effizienzo-api.onrender.com/api/v1/users');
      const users = response.data.data;

      // Finde den Benutzer mit Benutzername und Passwort
      const user = users.find(u => u.benutzername === benutzername && u.passwort === password);

      if (user) {
        // Lokal im Frontend den loggedIn-Status auf true setzen
        user.loggedIn = 1;
        window.location = "/mainsite";

        // PUT-Request im Backend durchführen
        const putResponse = await axios.put(`https://nodejs-effizienzo-api.onrender.com/api/v1/users/${user.id}`, user);

        if (putResponse.data.status === 'success') {
          // Erfolgreich aktualisiert
          setErrorMessage('');
          console.log("loggedIn");
        } else {
          setErrorMessage('Fehler beim Aktualisieren des Benutzers.');
        }
      } else {
        setErrorMessage('Benutzername oder Passwort falsch.');
      }
    } catch (error) {
      setErrorMessage('Fehler beim Login.');
      console.error('Fehler beim Abrufen der Benutzerdaten oder beim Aktualisieren des Benutzers:', error);
    }
  };

  return (
    <div className='login'>
      <div className={`Circle`}>
        <form className='LoginForm' onSubmit={handleLogin}>
          <h1>Login</h1>
          <input
            type='text'
            placeholder='Benutzername'
            disabled={loginAttempted}
            onChange={(e) => setBenutzername(e.target.value)}
          />
          <input
            type='password'
            placeholder='Passwort'
            disabled={loginAttempted}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className='error-message'>{errorMessage}</div>
          <button type='submit' disabled={loginAttempted}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
