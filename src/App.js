import React, { useState } from 'react';
import './App.css';

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

  const handleChange = (label, value) => {
    setData(prevData => ({
      ...prevData,
      [label]: value
    }));
  };

  const handleCopy = () => {
    const text = Object.entries(data)
      .map(([label, value]) => `${label}: ${value}`)
      .join('\n');
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="App">
      <div>
        {Object.entries(data).map(([label, value]) => (
          <div key={label} className="input-container">
            <label>{label}:</label>
            <input
              type="text"
              value={value}
              onChange={e => handleChange(label, e.target.value)}
            />
          </div>
        ))}
      </div>
      <button onClick={handleCopy}>Inhalt kopieren</button>
    </div>
  );
}

export default App;
