import React, { useState, useEffect } from 'react';
import './Startsite.scss';

function Startsite() {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [loginAttempted, setLoginAttempted] = useState(false);
  const [loginSuccessful, setLoginSuccessful] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const checkLogin = () => {
    try {
      // Nur den Benutzer mit dem Benutzernamen "123" und dem Passwort "123" zulassen
      if (
  (username === 'LeBa' && password === 'L3nnyBalm3r') ||
  (username === 'LuHa' && password === 'Luk4sH4nk3') ||
  (username === 'ElHa' && password === 'El3n4H4ldim4nn') ||
  (username === 'LeMü' && password === 'L3v1nMüh1eth4ler') ||
  (username === 'AnKu' && password === 'Andr3Kuhlo') ||
  (username === 'MaSc' && password === 'M4tthi4sSch1ld') ||
  (username === 'LeMo' && password === 'L34M0ser') ||
  (username === 'JaAf' && password === 'J4nin3Aff0lt3r') ||
  (username === 'ChAn' && password === 'Ch4t3lain4ngel3s') ||
  (username === 'FlBl' && password === 'Luk4sH4nk3') ||
  (username === 'AlHof' && password === 'A73xR35tw3rt') ||
  (username === 'NaBar' && password === 'Nad7aR35tw3rt') ||
  (username === 'CoSch' && password === 'C0rn371aR35tw3rt') 
) {
        setLoginSuccessful(true);
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

  const handleLogin = (e) => {
    e.preventDefault();
    checkLogin();
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
    if (loginSuccessful) {
      // Hier wird nach dem erfolgreichen Login der Benutzername an die Hauptseite weitergegeben.
      window.location = `/mainsite?username=${username}`;
      console.log('Login erfolgreich! Weiterleitung zur Hauptseite...');
    }
  }, [loginSuccessful, username]);

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
