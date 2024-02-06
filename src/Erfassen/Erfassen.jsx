import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faTrash, faFilePdf, faCheck, faQuestionCircle, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import jsPDF from 'jspdf';
import '../Erfassen/Erfassen.scss';
import Navbar from '../Navbar/Navbar';
import axios from 'axios'; // Hier wurde der Import von 'axios' korrigiert

function Erfassen() {
  const [erfassen, setErfassen] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/erfassen')
      .then(response => {
        setErfassen(response.data);
      })
      .catch(error => {
        console.error('Fehler beim Abrufen der Updates:', error);
      });
  }, []);

  const [data, setData] = useState({
    'Bei Nichtverkauf': '',
    'Minimumpreis': '',
    'Startpreis': '',
    '1. Reaktivierung': '',
    '2. Reaktivierung': '',
    '3. Reaktivierung': '',
  });

  const [selectedOption, setSelectedOption] = useState('');
  const [copiedLabel, setCopiedLabel] = useState(null);

  const pdfRef = useRef(); // Ref für das PDF-Element

  const handleInputChange = (label, value) => {
    if (/^[0-9.]*$/.test(value) || label !== 'Startpreis') {
      setData(prevData => ({
        ...prevData,
        [label]: value,
      }));
    }
  };

  const handleMinimumpreisChange = (label, value) => {
    if (/^[0-9.]*$/.test(value) || label !== 'Minimumpreis') {
      setData(prevData => ({
        ...prevData,
        [label]: value,
      }));
    }
  };

  const handleReaktivierungChange = (label, value) => {
    if (/^[0-9.]*$/.test(value) || label !== '1. Reaktivierung') {
      setData(prevData => ({
        ...prevData,
        [label]: value,
      }));
    }
  };

  const handleReaktivierung2Change = (label, value) => {
    if (/^[0-9.]*$/.test(value) || label !== '2. Reaktivierung') {
      setData(prevData => ({
        ...prevData,
        [label]: value,
      }));
    }
  };

  const handleReaktivierung3Change = (label, value) => {
    if (/^[0-9.]*$/.test(value) || label !== '3. Reaktivierung') {
      setData(prevData => ({
        ...prevData,
        [label]: value,
      }));
    }
  };

  const handleCopy = label => {
    let text = `${label}: ${data[label]}`;

    if (label === 'Minimumpreis' || label === 'Startpreis' || label === '1. Reaktivierung' || label === '2. Reaktivierung' || label === '3. Reaktivierung') {
      text = `CHF ${data[label]}`;
    }

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

  const handleCopyBeiNichtverkauf = () => {
    const text = `${selectedOption}`;

    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);

      setCopiedLabel('Bei Nichtverkauf');
      setTimeout(() => setCopiedLabel(null), 1000);
    } catch (error) {
      console.error('Kopieren fehlgeschlagen:', error);
    }
  };

  const handleClearAll = () => {
    setData({
      'Bei Nichtverkauf': '',
      'Minimumpreis': '',
      'Startpreis': '',
      '1. Reaktivierung': '',
      '2. Reaktivierung': '',
      '3. Reaktivierung': '',
    });
  };

  const handleExportToPDF = () => {
    const doc = new jsPDF();
    let yPos = 20;

    Object.entries(data).forEach(([label, value]) => {
      doc.text(20, yPos, `${label}: ${value}`);
      yPos += 10;
    });

    doc.text(20, yPos, `Bei Nichtverkauf: ${selectedOption}`);
    yPos += 10;

    doc.save('erfassen.pdf');
  };

  return (
    <div className="erfassen-container">
      <div className="warning-box">
        <FontAwesomeIcon icon={faExclamationTriangle} style={{ color: 'white', marginRight: '5px' }} />
        Bitte sonst noch andere wichtige relevante Informationen erfassen! Wie z.B. für technische Geräte ist es sehr wichtig!
      </div>

      <div className='button-container'>
        <button
          onClick={handleClearAll}
          style={{
            backgroundColor: 'red',
            color: 'white',
          }}
        >
          <span className="trash-icon">
            <FontAwesomeIcon icon={faTrash} /> Alle Eingaben Löschen
          </span>
        </button>

        <button onClick={handleExportToPDF} className="export-button">
          <FontAwesomeIcon icon={faFilePdf} /> PDF Exportieren
        </button>
      </div>

      <div className="input-container">
        {erfassen.map(erfassen => (
          <div key={erfassen.id} className="input-field">
            <label>{erfassen.label}:</label>
            <input
              type="text"
              value={data[erfassen.label]}
              onChange={(e) => handleInputChange(erfassen.label, e.target.value)}
            />
            <button
              onClick={() => handleCopy(erfassen.label)}
              style={{
                backgroundColor: copiedLabel === erfassen.label ? 'limegreen' : '',
              }}
            >
              {copiedLabel === erfassen.label ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faCopy} />}
            </button>
          </div>
        ))}
        {Object.entries(data).map(([label, value]) => (
          <div key={label} className="input-field">
            <label style={{ fontSize: '18px', marginRight: '10px' }}>
              {label}:
              {label === 'Hinweise' && (
                <FontAwesomeIcon
                  icon={faQuestionCircle}
                  style={{ marginLeft: '5px', color: '#007bff', cursor: 'pointer' }}
                  title="Sonstige Weiterführende Informationen hier eintragen!!"
                />
              )}
            </label>
            {label === 'Bei Nichtverkauf' ? (
              <>
                <select
                  value={selectedOption}
                  onChange={(e) => setSelectedOption(e.target.value)}
                  className='select'
                >
                  <option value="">Auswählen</option>
                  <option value="Spenden">Spenden</option>
                  <option value="Rücknahme">Rücknahme</option>
                </select>
                <button
                  onClick={handleCopyBeiNichtverkauf}
                  style={{
                    backgroundColor: copiedLabel === 'Bei Nichtverkauf' ? 'limegreen' : '',
                  }}
                >
                  {copiedLabel === 'Bei Nichtverkauf' ? (
                    <FontAwesomeIcon icon={faCheck} />
                  ) : (
                    <FontAwesomeIcon icon={faCopy} />
                  )}
                </button>
              </>
            ) : (
              <>
                <input
                  type={(label === 'Minimumpreis' || label === 'Startpreis' || label === '1. Reaktivierung' || label === '2. Reaktivierung' || label === '3. Reaktivierung') ? 'number' : 'text'}
                  value={value}
                  onChange={(e) => {
                    if (label === 'Minimumpreis') {
                      handleMinimumpreisChange(label, e.target.value);
                    } else if (label === 'Startpreis') {
                      handleInputChange(label, e.target.value);
                    } else if (label === '1. Reaktivierung') {
                      handleReaktivierungChange(label, e.target.value);
                    } else if (label === '2. Reaktivierung') {
                      handleReaktivierung2Change(label, e.target.value);
                    } else if (label === '3. Reaktivierung') {
                      handleReaktivierung3Change(label, e.target.value);
                    } else {
                      handleInputChange(label, e.target.value);
                    }
                  }}
                />
                <button
                  onClick={() => handleCopy(label)}
                  style={{
                    backgroundColor: copiedLabel === label ? 'limegreen' : '',
                  }}
                >
                  {copiedLabel === label ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faCopy} />}
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Erfassen;
