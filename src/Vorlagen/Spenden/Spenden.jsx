import React, { useState } from 'react';
import './Spenden.scss'; // Stile können in einer separaten Datei definiert werden

function Spenden() {
  const [isChecked, setChecked] = useState(false);
  const [selectedGender, setSelectedGender] = useState(null);
  const [inputList, setInputList] = useState([{ id: 0, text: '' }]);
  const [lastName, setLastName] = useState('');
  const [mitarbeiter, setMitarbeiter] = useState('Max Mustermann'); // Beispiel-Mitarbeitername
  const [isLastNameInputVisible, setLastNameInputVisible] = useState(true);
  const [isFinishButtonVisible, setFinishButtonVisible] = useState(true);

  const leider = 'Leider überbringen wir Ihnen keine guten Neuigkeiten.';
  const trotzBemuehungen = 'hat es trotz all unseren Bemühungen nicht geschafft, einen neuen Besitzer zu finden.';
  const grosszuegigText = 'Sie haben sich grosszügig dazu entschlossen, den Artikel bei Nichtverkauf zu spenden. Die Bärner Brocki der GEWA wird sich nun darum kümmern, einen glücklichen Käufer zu finden.';
  const dankText = 'Wir bedanken uns herzlich für die Spende und Ihr Vertrauen.';
  const greetings = 'Freundliche Grüsse';
  const adresse = 'Grubenstrasse 22, 3322 Urtenen-Schönbühl';
  const contact = 'Tel: 031 919 46 53 | schoenbuehl@projekt-restwert.ch | www.projekt-restwert.ch';
  const ricardo = 'Alle aktuellen Artikel finden Sie auf ricardo.';
  const oeffnungszeiten = 'Unsere Öffnungszeiten sind: Montag - Freitag 08.00 - 12.00 Uhr und 13.00 - 16.30 Uhr';
  const betrieb = 'Betriebsferien über den Jahreswechsel: Bitte beachten Sie, dass unser Standort vom 23.12.2023 bis am 03.01.2024 geschlossen ist.';

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

    // Füge die Eingabefeld-Daten hinzu
    const inputText = inputList.map((item) => `• ${item.text}`).join('\n');
    const articleText = inputList.length === 1 ? 'Ihr Artikel' : 'Ihre Artikel';
    const fullTemplate = `${salutation}${lastNameText}\n\n${leider} ${articleText}\n\n${inputText}\n\n${trotzBemuehungen}\n\n${grosszuegigText}\n\n${dankText}\n\n${greetings}\n\n${mitarbeiter}\n\n${adresse}\n${contact}\n${ricardo}\n${oeffnungszeiten}\n${betrieb}`;
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
      <p>{leider}</p> <p>{inputList.length === 1 ? 'Ihr' : 'Ihre'} Artikel</p>

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

      <p>{trotzBemuehungen}</p>
      <p>{grosszuegigText}</p>
      <p>{dankText}</p>

      <p>{greetings}</p>

      <p>{mitarbeiter}</p>

      <p>{adresse}</p>
      <p>{contact}</p>
      <p>{ricardo}</p>

      <p>{oeffnungszeiten}</p>
      <p>{betrieb}</p>

      <button onClick={handleAddInput}>+</button>

      <button onClick={handleGenerateTemplate}>
        Vorlage generieren und kopieren
      </button>
    </div>
  );
}

export default Spenden;
