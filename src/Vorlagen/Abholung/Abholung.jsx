import React, { useState } from 'react';
import './Abholung.scss';

function Abholung() {
  const [isChecked, setChecked] = useState(false);
  const [selectedGender, setSelectedGender] = useState(null);
  const [inputList, setInputList] = useState([{ id: 0, text: '' }]);
  const [lastName, setLastName] = useState('');
  const [isLastNameInputVisible, setLastNameInputVisible] = useState(true);
  const [generatedTemplate, setGeneratedTemplate] = useState('');
  const [isFinishButtonVisible, setFinishButtonVisible] = useState(true);

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
    const frist = 'Sie haben uns bei der Lieferung mitgeteilt, dass Sie bei einem Nicht verkauf den/die Artikel gerne wieder zu sich nehmen wollen. Bitte holen Sie die Artikel innerhalb der nächsten 14 Tagen auf Anmeldung bei uns ab.';
    
    // Füge die Eingabefeld-Daten hinzu
    const inputText = inputList.map((item) => `• ${item.text}`).join('\n');
    const fullTemplate = `${salutation}${lastNameText}\n${leider}\n\n${inputText}\n\n${frist}`;
  
    // Erstelle ein unsichtbares Textarea-Element, füge den Text hinzu und kopiere ihn
    const textarea = document.createElement('textarea');
    textarea.value = fullTemplate;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    
    // Hier könntest du auch andere Aktionen ausführen, z.B. eine Benachrichtigung anzeigen
    alert('Vorlage wurde generiert und in die Zwischenablage kopiert!');
    
    // Setze den generierten Text in den State, wenn er gespeichert werden soll
    setGeneratedTemplate(fullTemplate);
    
    // Verberge den Finish-Button und das Nachname-Feld
    setFinishButtonVisible(false);
    setLastNameInputVisible(false);
  };
  

  return (
    <div className="abholung-container">
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
              placeholder='Artikel'
              value={item.text}
              onChange={(e) => handleInputChange(item.id, e.target.value)}
            />
          </div>
        ))}
      </div>

      <button onClick={handleAddInput}>+</button>

      <p>
            Sie haben uns bei der Lieferung mitgeteilt, dass Sie bei einem Nicht verkauf den/die Artikel gerne wieder zu sich nehmen wollen.
            Bitte holen Sie die Artikel innerhalb der nächsten 14 Tagen auf Anmeldung bei uns ab.
          </p>
          <button onClick={handleGenerateTemplate}>
            Vorlage generieren und kopieren
          </button>

      {isFinishButtonVisible && (
        <div>
          <button onClick={() => {
            setFinishButtonVisible(false);
            setLastNameInputVisible(false);
          }}>Fertig</button>
        </div>
      )}

     
    </div>
  );
}

export default Abholung;
