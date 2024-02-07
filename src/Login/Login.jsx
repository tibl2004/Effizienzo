import React, { useState } from 'react';
import './Login.scss';
import axios from 'axios';

// Konfiguriere die Basis-URL für Axios
axios.defaults.baseURL = 'http://localhost:4000';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Senden Sie eine Anfrage, um den Benutzer abzurufen
      const response = await axios.get(`http://localhost:4000/users`);
      const users = response.data;
      // Suche nach dem Benutzer anhand des Benutzernamens
      const user = users.find(u => u.username === username);
      if (user) {
        // Überprüfen, ob das eingegebene Passwort mit dem im Backend gespeicherten Passwort übereinstimmt
        if (user.password === password) {
          // Wenn das Passwort übereinstimmt, leiten Sie den Benutzer zur Hauptseite weiter
          window.location = "/mainsite";
        } else {
          // Wenn das Passwort nicht übereinstimmt, setzen Sie die Fehlermeldung
          setErrorMessage('Falsches Passwort. Bitte versuchen Sie es erneut.');
        }
      } else {
        // Wenn der Benutzer nicht gefunden wurde, setzen Sie die Fehlermeldung
        setErrorMessage('Benutzer nicht gefunden. Bitte überprüfen Sie Ihren Benutzernamen.');
      }
    } catch (error) {
      // Bei Fehlern setzen Sie die Fehlermeldung basierend auf der Fehlerantwort
      console.error('Fehler beim Einloggen: ', error);
      setErrorMessage('Fehler beim Einloggen. Bitte versuchen Sie es erneut.');
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
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type='password'
            placeholder='Passwort'
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className='error-message'>{errorMessage}</div>
          <button type='submit'>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
