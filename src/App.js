import React, { useState } from 'react';
import { FaCopy, FaCheck } from 'react-icons/fa';
import './App.css';
import logo from '../src/Logo.png'; 

function App() {
  const [data, setData] = useState({
    Marke: '',
    Grösse: '',
    Anzahl: '',
    Material: '',
    Farbe: '',
    Schäden: '',
    Hinweise: '',
    Lieferant: ''
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

  return (
    <div className="App">
      <div className='navbar'>
        <div className='logo-container'>
          <img src={logo} alt="Restwert" />
        </div>
      </div>
      {Object.entries(data).map(([label, value]) => (
        <div key={label} className="input-container">
          <label style={{ fontSize: '18px', marginRight: '10px' }}>{label}:</label>
          <input
            type="text"
            value={value}
            onChange={e => handleInputChange(label, e.target.value)}
            style={{
              width: '200px',
              height: '30px',
              fontSize: '20px', // Increase font size
            }}
          />
          <button
            onClick={() => handleCopy(label)}
            style={{
              backgroundColor: copiedLabel === label ? 'limegreen' : '',
              height: '40px',
              marginLeft: '10px',
              fontSize: '20px', // Increase font size
            }}
          >
            {copiedLabel === label ? <FaCheck /> : <FaCopy />}
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;