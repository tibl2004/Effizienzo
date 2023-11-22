import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Startsite.scss';

function Startsite() {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [loginAttempted, setLoginAttempted] = useState(false);
  const [loginSuccessful, setLoginSuccessful] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const checkLogin = async (username, password) => {
    try {
      // Benutzer- und Admin-Daten separat abrufen
      const usersResponse = await fetch('https://users-8a52.onrender.com/users');
      const adminsResponse = await fetch('https://users-8a52.onrender.com/admins');
  
      const usersData = await usersResponse.json();
      const adminsData = await adminsResponse.json();
  
      // Prüfen Sie, ob der Benutzer in Benutzern oder Admins gefunden wurde
      const userFound = usersData.find((user) => user.username === username && user.password === password);
      const adminFound = adminsData.find((admin) => admin.username === username && admin.password === password);
  
      if (userFound || adminFound) {
        const userId = userFound ? userFound.userId : adminFound.userId;
  
        // Hier die URL für die PUT-Anfrage einfügen (zum Beispiel für Benutzer)
        try {
          console.log('Sende PUT-Anfrage für Benutzer...');
          const response = await axios.put(`https://users-8a52.onrender.com/users/${userId}`, {
            loggedIn: true,
            // other fields you want to update
          });
          console.log('PUT response:', response);
  
          console.log('PUT-Anfrage für Benutzer erfolgreich gesendet.');
  
          // Setze den Login-Erfolg nur nach erfolgreicher PUT-Anfrage
          setLoginSuccessful(true);
        } catch (error) {
          console.error('Fehler bei der PUT-Anfrage:', error);
          setErrorMessage('Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.');
          setLoginAttempted(true);
        }
      } else {
        setErrorMessage('Falscher Benutzername oder Passwort');
        setLoginAttempted(true);
      }
    } catch (error) {
      console.error('Error checking login:', error);
      setErrorMessage('Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.');
      setLoginAttempted(true);
    }
  };
  

  const handleLogin = async (e) => {
    e.preventDefault();

    await checkLogin(username, password);
  };

  const handleInputChange = () => {
    setErrorMessage('');
  };

  useEffect(() => {
    setTimeout(() => {
      setShowLoginForm(true);
    }, 2000);
  }, []);

  useEffect(() => {
    // Zurücksetzen des Login-Versuch-Status, wenn loginAttempted sich ändert
    if (loginAttempted) {
      setLoginAttempted(false);
    }
  }, [loginAttempted]);

  useEffect(() => {
    if (loginSuccessful) {
      window.location = '/mainsite';
      console.log('Login erfolgreich! Weiterleitung zur Hauptseite...');
    }
  }, [loginSuccessful]);

  return (
    <div className='login'>
      <div className={`Circle ${showLoginForm ? 'visible' : ''} ${loginSuccessful ? 'login-successful' : ''}`}>
        {showLoginForm && (
          <form className='LoginForm' onSubmit={handleLogin}>
            <h1>Login</h1>
            <input
              type='text'
              placeholder='Benutzername'
              disabled={loginAttempted}
              onChange={(e) => setUsername(e.target.value)}
              onFocus={handleInputChange}
            />
            <input
              type='password'
              placeholder='Passwort'
              disabled={loginAttempted}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={handleInputChange}
            />
            <div className='error-message'>{errorMessage}</div>
            <button type='submit' disabled={loginAttempted}>
              Login
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Startsite;
