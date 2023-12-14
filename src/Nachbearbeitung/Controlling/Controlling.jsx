import React, { useState } from 'react';
import './Controlling.scss';

function Controlling() {
  const [controllingData, setControllingData] = useState([
    { id: 1, was: 'Bezahlung ausstehend / Buchhaltung', ricardo: '', datenbank: '', differenz: '', grund: '' },
    { id: 2, was: 'Übergabe ausstehend / Versand', ricardo: '', datenbank: '', differenz: '', grund: '' },
    { id: 3, was: 'Bewertung ausstehend', ricardo: '', datenbank: '', differenz: '', grund: '' },
  ]);

  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (id, text) => {
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);

    setCopiedId(id);

    setTimeout(() => {
      setCopiedId(null);
    }, 3000);
  };

  const updateControllingData = (id, field, value) => {
    setControllingData((prevData) =>
      prevData.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  const calculateDifferenz = (ricardo, datenbank) => {
    const ricardoValue = parseFloat(ricardo) || 0;
    const datenbankValue = parseFloat(datenbank) || 0;
    const differenz = ricardoValue - datenbankValue;

    // Check if the difference is an integer, then return as an integer
    if (Number.isInteger(differenz)) {
      return String(differenz);
    }

    // If it has decimal places, return with 2 decimal places
    return differenz.toFixed(2);
  };

  return (
    <div>
      <h1>Controlling</h1>

      <table border="1" className="controlling-table">
        <thead>
          <tr>
            <th>Was</th>
            <th>Ricardo</th>
            <th>Datenbank</th>
            <th>Differenz</th>
            <th>Grund</th>
          </tr>
        </thead>
        <tbody>
          {controllingData.map((rowData) => (
            <tr key={rowData.id}>
              <td>{rowData.was}</td>
              <td>
                <input
                  type="text"
                  value={rowData.ricardo}
                  onChange={(e) => {
                    const value = e.target.value;
                    updateControllingData(rowData.id, 'ricardo', value);
                    updateControllingData(rowData.id, 'differenz', calculateDifferenz(value, rowData.datenbank));
                  }}
                />
              </td>
              <td>
                {rowData.was === 'Bewertung ausstehend' ? (
                  <div className="disabled-input" />
                ) : (
                  <input
                    type="text"
                    value={rowData.datenbank}
                    onChange={(e) => {
                      const value = e.target.value;
                      updateControllingData(rowData.id, 'datenbank', value);
                      updateControllingData(rowData.id, 'differenz', calculateDifferenz(rowData.ricardo, value));
                    }}
                  />
                )}
              </td>
              <td style={{ backgroundColor: rowData.differenz > 0 || rowData.differenz < 0 ? 'orange' : 'white' }}>
  {rowData.differenz === '' ? '0' : rowData.differenz}
</td>
              <td>{rowData.grund}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ... rest of your code */}
    </div>
  );
}

export default Controlling;
