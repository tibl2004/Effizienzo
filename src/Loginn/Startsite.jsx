import React, { useState, useEffect } from 'react';
import './Startsite.scss';

const Startsite = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [loginAttempted, setLoginAttempted] = useState(false);
  const [loginSuccessful, setLoginSuccessful] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === '123' && password === '123') {
      setLoginSuccessful(true);
      window.location = '/mainsite'
    } else {
      setErrorMessage('Falscher Benutzername oder Passwort');
      setLoginAttempted(true);
    }
  };

  const handleInputChange = () => {
    setErrorMessage('');
    setLoginAttempted(false); // Zurücksetzen, wenn der Benutzername oder das Passwort geändert wird
  };

  useEffect(() => {
    setTimeout(() => {
      setShowLoginForm(true);
    }, 2000);
  }, []);

  useEffect(() => {
    if (loginSuccessful) {
      window.location = '/mainsite';
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
              disabled={loginAttempted && !loginSuccessful}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type='password'
              placeholder='Passwort'
              disabled={loginAttempted && !loginSuccessful}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className='error-message'>{errorMessage}</div>
            <button type='submit' disabled={loginAttempted && !loginSuccessful}>
              Login
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Startsite;
