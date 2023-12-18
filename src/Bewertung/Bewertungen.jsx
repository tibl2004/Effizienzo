import React, { useState } from 'react';
import { FaRegSmile, FaMeh, FaRegFrown } from 'react-icons/fa';
import './Bewertungen.scss';

function Bewertungen() {
  const [greetingMessage, setGreetingMessage] = useState("Alles super. Vielen Dank und gerne wieder!");
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
        <textarea
          id="textArea"
          value={greetingMessage}
          onChange={handleTextChange}
        />
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
