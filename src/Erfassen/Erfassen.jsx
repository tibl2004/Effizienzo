import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Erfassen.scss';

function Erfassen() {
  const [labels, setLabels] = useState([]);
  const [inputData, setInputData] = useState({});
  const [showInput, setShowInput] = useState(false);
  const [newData, setNewData] = useState('');
  const [editingId, setEditingId] = useState(null); // ID des Eintrags, der bearbeitet wird
  const [editedText, setEditedText] = useState(''); // Aktuell bearbeiteter Text

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/erfassen');
        setLabels(response.data);
      } catch (error) {
        console.error('Fehler beim Abrufen der Daten:', error);
      }
    };

    fetchData();

    // Daten alle 5 Sekunden aktualisieren
    const intervalId = setInterval(fetchData, 1000);

    return () => clearInterval(intervalId); // Clear Interval beim Entfernen der Komponente
  }, []); // Leerer Abhängigkeitsarray stellt sicher, dass der Effekt nur einmal ausgeführt wird

  const handleInputChange = (id, value) => {
    setInputData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleDeleteInput = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/erfassen/${id}`);
      const updatedInputData = { ...inputData };
      delete updatedInputData[id];
      setInputData(updatedInputData);
    } catch (error) {
      console.error('Fehler beim Löschen der Daten:', error);
      alert('Fehler beim Löschen der Daten!');
    }
  };

  const handleEditInput = (id, text) => {
    setEditingId(id);
    setEditedText(text);
  };

  const handleSaveEdit = async (id) => {
    try {
      await axios.put(`http://localhost:4000/erfassen/${id}`, {
        label: editedText
      });
      setEditingId(null);
    } catch (error) {
      console.error('Fehler beim Speichern der Änderungen:', error);
      alert('Fehler beim Speichern der Änderungen!');
    }
  };

  const handlePostData = async () => {
    try {
      await axios.post('http://localhost:4000/erfassen', {
        label: newData
      });
      setNewData('');
      setShowInput(false);
    } catch (error) {
      console.error('Fehler beim Posten der Daten:', error);
      alert('Fehler beim Posten der Daten!');
    }
  };

  const handlePlusButtonClick = () => {
    const newDataInput = prompt('Bitte geben Sie die Daten ein:');
    if (newDataInput !== null) {
      setNewData(newDataInput);
      setShowInput(true);
    }
  };

  return (
    <div className="erfassen">
      <ul>
        {labels.map((item) => (
          <li key={item.id}>
            {editingId === item.id ? (
              <>
                <input
                  type="text"
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                />
                <button onClick={() => handleSaveEdit(item.id)}>Speichern</button>
              </>
            ) : (
              <>
                {item.label}:
                <input
                  type="text"
                  value={inputData[item.id] || ''}
                  onChange={(e) => handleInputChange(item.id, e.target.value)}
                  disabled={editingId !== null} // Eingabefeld deaktivieren, wenn bearbeitet wird
                />
                <button onClick={() => handleEditInput(item.id, inputData[item.id] || '')}>Bearbeiten</button>
                <button onClick={() => handleDeleteInput(item.id)}>Löschen</button>
              </>
            )}
          </li>
        ))}
      </ul>
      {showInput && (
        <div>
          <button onClick={handlePostData}>Daten posten</button>
        </div>
      )}
      <button onClick={handlePlusButtonClick}>+</button>
    </div>
  );
}

export default Erfassen;
