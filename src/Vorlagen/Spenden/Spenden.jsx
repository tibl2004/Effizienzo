import React, { useState } from 'react';
import './Spenden.scss'; // Stile können in einer separaten Datei definiert werden

function Spenden() {
  const [isChecked, setChecked] = useState(false);
  const [selectedGender, setSelectedGender] = useState(null);
  const [inputList, setInputList] = useState([{ id: 0, text: '' }]);
  const [lastName, setLastName] = useState('');
  const [isLastNameInputVisible, setLastNameInputVisible] = useState(true);

  const handleCheckboxChange = () => {
    setChecked(!isChecked);
  };

  const handleGenderChange = (gender) => {
    setSelectedGender(gender);
  };

  const handleInputChange = (id, value) => {
    const updatedInputList = inputList.map((item) =>
      item.id === id ? { ...item, text: value } : item
    );
    setInputList(updatedInputList);
  };

  const handleAddInput = () => {
    setInputList([...inputList, { id: inputList.length, text: '' }]);
  };

  const handleGenerateTemplate = () => {
    // Hier kannst du die Daten zusammensetzen
    const salutation = `Guten Tag ${selectedGender === 'mann' ? 'Herr' : 'Frau'}`;
    const lastNameText = lastName ? ` ${lastName}` : '';
    const leider = 'Leider überbringen wir Ihnen keine guten Neuigkeiten.';
    
    // Füge die Eingabefeld-Daten hinzu
    const inputText = inputList.map((item) => `• ${item.text}`).join('\n');
    const fullTemplate = `${salutation}${lastNameText}\n${leider}\n${inputText}`;
    
    // Kopiere den generierten Text in die Zwischenablage
    navigator.clipboard.writeText(fullTemplate);
    
    // Hier könntest du auch andere Aktionen ausführen, z.B. eine Benachrichtigung anzeigen
    alert('Vorlage wurde generiert und in die Zwischenablage kopiert!');
  };

  const handleFinishButtonClick = () => {
    setLastNameInputVisible(false);
  };

  return (
    <div className="spenden-container">
      <h1>Guten Tag {selectedGender === 'mann' ? 'Herr' : 'Frau'} {lastName}</h1>
      <p>Leider überbringen wir Ihnen keine guten Neuigkeiten.</p>

      <div className="radio-container">
        <label>
          <input
            type="radio"
            name="gender"
            value="mann"
            checked={selectedGender === 'mann'}
            onChange={() => handleGenderChange('mann')}
          />
          Herr
        </label>

        <label>
          <input
            type="radio"
            name="gender"
            value="frau"
            checked={selectedGender === 'frau'}
            onChange={() => handleGenderChange('frau')}
          />
          Frau
        </label>
      </div>

      {isLastNameInputVisible && (
        <div className="last-name-container">
          <label>
            Nachname:
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </label>
        </div>
      )}

      <div className="input-list-container">
        {inputList.map((item) => (
          <div key={item.id} className="input-item">
            <input
              type="text"
              value={item.text}
              onChange={(e) => handleInputChange(item.id, e.target.value)}
            />
          </div>
        ))}
      </div>

      <button onClick={handleAddInput}>+</button>

      <button onClick={handleGenerateTemplate}>
        Vorlage generieren und kopieren
      </button>

      <button onClick={handleFinishButtonClick}>Fertig</button>
    </div>
  );
}

export default Spenden;
