import React, { useState } from 'react';
import { FaRegSmile, FaMeh, FaRegFrown } from 'react-icons/fa';
import './Bewertungen.scss';

function Bewertungen() {
  const bewertungen = [
    "Alles super. Vielen Dank und gerne wieder!",
    "Besten Dank für Ihren Kauf. Gerne wieder.",
    "Vielen Dank für Ihren Kauf bei uns.",
    "Alles tiptop.",
    "Hat wie immer alles wunderbar geklappt. Herzlichen Dank!"
  ];
  

  const [greetingMessage, setGreetingMessage] = useState(bewertungen[0]);
  const [copied, setCopied] = useState(false);

  const handleTextChange = (e) => {
    setGreetingMessage(e.target.value);
  };

  const copyToClipboard = () => {
    const textToCopy = greetingMessage;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000); // Zurücksetzen des "copied"-Status nach 2 Sekunden
    });
  };

  return (
    <div>
      <h1>Bewertungen</h1>
      <div className='formatierung'>
        <label htmlFor="textArea">Hier wäre ein Vorschlag für die Bewertung für einen Kunden. Du kannst ihn aber auch anpassen und dann kopieren: </label>
        <select className="custom-select" onChange={handleTextChange} value={greetingMessage}>
          {bewertungen.map((bewertung, index) => (
            <option key={index} value={bewertung}>{bewertung}</option>
          ))}
        </select>
        <div className="emoji-buttons">
          <button className={copied ? "copy copied" : "copy"} onClick={copyToClipboard}>
            {copied ? "Kopiert!" : "Kopieren"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Bewertungen;
