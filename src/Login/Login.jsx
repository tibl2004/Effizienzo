import React, { useState } from 'react';
import './Login.scss';
import axios from 'axios';

// Konfiguriere die Basis-URL für Axios
axios.defaults.baseURL = 'http://localhost:4000';

function Login() {
  const [benutzername, setBenutzername] = useState('');
  const [password, setPassword] = useState('');
  const [loginAttempted, setLoginAttempted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginAttempted(true);

    try {
      // Sende die Anfrage an localhost:4000/users
      const response = await axios.get('/users');
      const users = response.data.data;

      // Finde den Benutzer mit Benutzername und Passwort
      const user = users.find(u => u.username === benutzername && u.password === password);

      if (user) {
        // PUT-Request im Backend durchführen, um loggedIn auf true zu setzen
        await axios.put(`/users/${user.id}`, { ...user, loggedIn: true });

        // Erfolgreich eingeloggt
        setErrorMessage('');
        console.log("loggedIn");
        window.location = "/mainsite";
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
