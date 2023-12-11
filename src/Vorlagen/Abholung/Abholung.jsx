import React, { useState } from 'react';
import './Abholung.scss'; // Stile können in einer separaten Datei definiert werden

function Spenden() {
  const [isChecked, setChecked] = useState(false);
  const [selectedGender, setSelectedGender] = useState(null);
  const [inputList, setInputList] = useState([{ id: 0, text: '' }]);
  const [lastName, setLastName] = useState('');
  const [isLastNameInputVisible, setLastNameInputVisible] = useState(true);
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
    const trotzBemuehungen = 'hat es trotz all unseren Bemühungen nicht geschafft, einen neuen Besitzer zu finden.';
    const grosszuegigText = 'Sie haben sich grosszügig dazu entschlossen, den Artikel bei Nichtverkauf zu spenden. Die Bärner Brocki der GEWA wird sich nun darum kümmern, einen glücklichen Käufer zu finden.';
    const dankText = 'Wir bedanken uns herzlich für die Spende und Ihr Vertrauen.';
    
    // Füge die Eingabefeld-Daten hinzu
    const inputText = inputList.map((item) => `• ${item.text}`).join('\n');
    const fullTemplate = `${salutation}${lastNameText}\n\n${leider}\n\n${inputText}\n\n${trotzBemuehungen}\n\n${grosszuegigText}\n\n${dankText}`;
    
    // Erstelle ein unsichtbares HTML-Element
    const hiddenElement = document.createElement('textarea');
    hiddenElement.value = fullTemplate;
    hiddenElement.style.position = 'absolute';
    hiddenElement.style.left = '-9999px';

    // Füge das Element zum DOM hinzu
    document.body.appendChild(hiddenElement);

    // Wähle den Text im Element aus
    hiddenElement.select();
    hiddenElement.setSelectionRange(0, 99999); // Für mobile Geräte

    // Kopiere den ausgewählten Text in die Zwischenablage
    document.execCommand('copy');

    // Entferne das unsichtbare Element
    document.body.removeChild(hiddenElement);

    // Hier könntest du auch andere Aktionen ausführen, z.B. eine Benachrichtigung anzeigen
    alert('Vorlage wurde generiert und in die Zwischenablage kopiert!');

    // Setze den "Fertig"-Button auf unsichtbar
    setFinishButtonVisible(false);
  };

  const handleFinishButtonClick = () => {
    setLastNameInputVisible(false);
  };

  return (
    <div className="spenden-container">
      <h1>Guten Tag {selectedGender === 'mann' ? 'Herr' : 'Frau'} {lastName}</h1>
      <p>Leider überbringen wir Ihnen keine guten Neuigkeiten.</p>

      {isLastNameInputVisible && (
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
      )}

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

      {isLastNameInputVisible && (
        <button onClick={handleFinishButtonClick}>Fertig</button>
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

      <p>hat es trotz all unseren Bemühungen nicht geschafft, einen neuen Besitzer zu finden.</p>

      <p>Sie haben sich grosszügig dazu entschlossen, den Artikel bei Nichtverkauf zu spenden. Die Bärner Brocki der GEWA wird sich nun darum kümmern, einen glücklichen Käufer zu finden.</p>

      <p>Wir bedanken uns herzlich für die Spende und Ihr Vertrauen.</p>

      <button onClick={handleAddInput}>+</button>

      <button onClick={handleGenerateTemplate}>
        Vorlage generieren und kopieren
      </button>
    </div>
  );
}

export default Spenden;
