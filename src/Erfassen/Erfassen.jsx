import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faTrash, faFilePdf, faCheck, faQuestionCircle, faExclamationTriangle, faPlus } from '@fortawesome/free-solid-svg-icons';
import jsPDF from 'jspdf';
import '../Erfassen/Erfassen.scss';
import Navbar from '../Navbar/Navbar';

function Erfassen() {
  const [erfassen, setErfassen] = useState([]);
  const [editedErfassen, setEditedErfassen] = useState(null);
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
  const [showAlert, setShowAlert] = useState(false);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    axios.get('http://localhost:4000/erfassen')
      .then(response => {
        setErfassen(response.data);
      })
      .catch(error => {
        console.error('Fehler beim Abrufen der Updates:', error);
      });
  }, []);

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

  const handleEditErfassen = (erfassen) => {
    setEditedErfassen(erfassen);
  };

  const handleCancelEdit = () => {
    setEditedErfassen(null);
  };

  const handleSaveEdit = async () => {
    try {
      const response = await axios.put(`http://localhost:4000/erfassen/${editedErfassen.id}`, editedErfassen);
      console.log('Erfassen erfolgreich aktualisiert:', response.data);

      setErfassen(prevErfassen => prevErfassen.map(erfassen =>
        erfassen.id === editedErfassen.id ? { ...response.data, label: editedErfassen.label } : erfassen
      ));
      setEditedErfassen(null);
    } catch (error) {
      console.error('Fehler beim Aktualisieren des Erfassen:', error);
    }
  };

  const handlePostNewLabel = async () => {
    try {
      await axios.post('http://localhost:4000/erfassen', { label: inputValue });
      setErfassen(prevErfassen => [...prevErfassen, { id: prevErfassen.length + 1, label: inputValue }]);
      setInputValue('');
      setShowAlert(false);
    } catch (error) {
      console.error('Fehler beim Posten des neuen Labels:', error);
    }
  };

  const handleDeleteErfassen = async (erfassenId) => {
    const isConfirmed = window.confirm('Bist du sicher, dass du diesen Benutzer löschen möchtest?');

    if (isConfirmed) {
      try {
        await axios.delete(`http://localhost:4000/erfassen/${erfassenId}`);
        console.log('Benutzer erfolgreich gelöscht:', erfassenId);

        setErfassen(prevErfassen => prevErfassen.filter(erfassen => erfassen.id !== erfassenId));
      } catch (error) {
        console.error('Fehler beim Löschen des Erfassen:', error);
      }
    } else {
      console.log('Löschen abgebrochen.');
    }
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

        <div className="input-field">
          <button onClick={() => setShowAlert(true)}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>

        {showAlert && (
          <div className="alert">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Neues Label eingeben"
            />
            <button onClick={() => { handlePostNewLabel(); setShowAlert(false); }}>
              OK
            </button>
          </div>
        )}

      </div>

      <div className="input-container">
        {erfassen.map(erfassen => (
          <div key={erfassen.id} className="input-field">
            {editedErfassen && editedErfassen.id === erfassen.id ? (
              <>
                <input
                  type="text"
                  value={editedErfassen.label}
                  onChange={(e) => setEditedErfassen({ ...editedErfassen, label: e.target.value })}
                />
                <button onClick={handleSaveEdit}>Speichern</button>
                <button onClick={handleCancelEdit}>Abbrechen</button>
              </>
            ) : (
              <>
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


                <button className='edit' onClick={() => handleEditErfassen(erfassen)}>
                  Bearbeiten
                </button>


                <button className='delete' onClick={() => handleDeleteErfassen(erfassen.id)}>
                  <FontAwesomeIcon icon={faTrash} /> Löschen
                </button>
              </>
            )}

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
