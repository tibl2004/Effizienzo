import React, { useState } from 'react';
import './Settings.scss';

function Settings() {
  const [selectedColor, setSelectedColor] = useState(null);

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const handleSpeichernClick = () => {
    if (selectedColor) {
      alert(`Die ausgewählte Farbe ist: ${selectedColor}`);
    } else {
      alert('Bitte wählen Sie eine Farbe aus.');
    }
  };

  return (
    <div>
      <div>
        <label>
          <input
            type="radio"
            name="color"
            value="red"
            checked={selectedColor === 'red'}
            onChange={() => handleColorChange('red')}
          />
          Rot
        </label>
        <div
          style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            backgroundColor: 'red',
            display: 'inline-block',
            marginLeft: '10px',
          }}
        ></div>
      </div>

      <div>
        <label>
          <input
            type="radio"
            name="color"
            value="blue"
            checked={selectedColor === 'blue'}
            onChange={() => handleColorChange('blue')}
          />
          Blau
        </label>
        <div
          style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            backgroundColor: 'blue',
            display: 'inline-block',
            marginLeft: '10px',
          }}
        ></div>
      </div>

      <button onClick={handleSpeichernClick}>Speichern</button>
    </div>
  );
}

export default Settings;
