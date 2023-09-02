import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faCheck, faTrash } from '@fortawesome/free-solid-svg-icons'; // Importiere die Icons

import './App.css';
import logo from '../src/Logo.jpeg';

function App() {
  const [data, setData] = useState({
    Marke: '',
    Grösse: '',
    Anzahl: '',
    Material: '',
    Farbe: '',
    Schäden: '',
    Hinweise: '',
  });

  const [copiedLabel, setCopiedLabel] = useState(null);

  const handleInputChange = (label, value) => {
    setData(prevData => ({
      ...prevData,
      [label]: value
    }));
  };

  const handleCopy = (label) => {
    const text = `${label}: ${data[label]}`;

    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);

      setCopiedLabel(label);
      setTimeout(() => setCopiedLabel(null), 1000);
    } catch (error) {
      console.error('Kopieren fehlgeschlagen:', error);
    }
  };

  const handleClearAll = () => {
    setData({
      Marke: '',
      Grösse: '',
      Anzahl: '',
      Material: '',
      Farbe: '',
      Schäden: '',
      Hinweise: '',
    });
  };

  return (
    <div className="App">
      <div className='navbar'>
  <div className='logo-container'>
    <div className='center-button'>
      <button
        onClick={handleClearAll}
        style={{
          backgroundColor: 'red',
          color: 'white',
        }}
      >
        <span className="trash-icon">
          <FontAwesomeIcon icon={faTrash} />
        </span>
      </button>
    </div>
    <div className='version-label'>V.1.2</div>
    <img src={logo} alt="Restwert" />
  </div>
</div>




      <div className="input-container">
        {Object.entries(data).map(([label, value]) => (
          <div key={label} className="input-field">
            <label style={{ fontSize: '18px', marginRight: '10px' }}>{label}:</label>
            <input
              type="text"
              value={value}
              onChange={e => handleInputChange(label, e.target.value)}
            />
            <button
              onClick={() => handleCopy(label)}
              style={{
                backgroundColor: copiedLabel === label ? 'limegreen' : '',
              }}
            >
              {copiedLabel === label ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faCopy} />}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
