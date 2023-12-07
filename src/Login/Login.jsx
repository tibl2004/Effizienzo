import React, { useState, useEffect } from 'react';
import './Login.scss';
import axios from 'axios';

function Startsite() {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [loginAttempted, setLoginAttempted] = useState(false);
  const [loginSuccessful, setLoginSuccessful] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const storedLoginStatus = localStorage.getItem('loggedIn');

    if (storedLoginStatus === 'true') {
      setLoginSuccessful(true);
    } else {
      setTimeout(() => {
        setShowLoginForm(true);
      }, 2000);
    }
  }, []);

  const checkUserLocation = async () => {
    try {
      const response = await axios.get('http://localhost:4000/users', {
        params: {
          username: username,
          password: password
        }
      });
  
      const loggedInUser = response.data.find(user => user.username === username);
  
      if (loggedInUser) {
        const updatedUser = { ...loggedInUser, loggedIn: true };
        localStorage.setItem('loggedInUser', JSON.stringify(updatedUser));
        localStorage.setItem('loggedIn', 'true');
        window.location = "/mainsite";
      } else {
        setErrorMessage('Falscher Benutzername oder Passwort.');
        setLoginAttempted(true);
        alert('Fehler beim Einloggen!');
      }
    } catch (error) {
      console.error('Error checking user location:', error);
      setErrorMessage('Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.');
      setLoginAttempted(true);
    }
  };
  

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginAttempted(false);
    setLoginSuccessful(false);
    await checkUserLocation();
  };

  const handleInputChange = () => {
    setErrorMessage('');
  };

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
