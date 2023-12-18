import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import logo from './postfinance-logo.png';
import './Postfinance.scss';

const PostFinanceForm = () => {
  const [eFinanceNumber, setEFinanceNumber] = useState('112792391');
  const [userIdentification, setUserIdentification] = useState('alho');
  const [password, setPassword] = useState('2CkzDr');
  const [pin, setPin] = useState('054460');
  const [showPassword, setShowPassword] = useState(false);

  const handleCopy = (value) => {
    navigator.clipboard.writeText(value)
      .then(() => {
        console.log(`Copied ${value} to clipboard`);
      })
      .catch((err) => {
        console.error('Unable to copy to clipboard', err);
      });
  };

  return (
    <div>
      <img src={logo} alt="PostFinance Logo" style={{ width: '100px', marginBottom: '20px' }} />
      <p>E-Finance-Nummer: {eFinanceNumber} <button onClick={() => handleCopy(eFinanceNumber)}>Kopieren</button></p>
      <p>Benutzeridentifikation: {userIdentification} <button onClick={() => handleCopy(userIdentification)}>Kopieren</button></p>
      <p>
        Passwort: {showPassword ? password : '•••••••'}
        <button onClick={() => setShowPassword(!showPassword)}>
          <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
        </button>
        <button onClick={() => handleCopy(password)}>Kopieren</button>
      </p>
      <p>PIN: {pin} <button onClick={() => handleCopy(pin)}>Kopieren</button></p>
    </div>
  );
};

export default PostFinanceForm;
