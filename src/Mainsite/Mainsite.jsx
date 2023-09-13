import React from 'react';
import './Mainsite.scss';
import Navbar from '../Navbar/Navbar';
import { Link } from 'react-router-dom';


function Mainsite() {
  const handleBoxClick = (title) => {
    // Füge hier deine Logik ein, die bei einem Klick auf eine Box ausgeführt werden soll.
    console.log(`Box "${title}" wurde geklickt.`);
  };

  return (
    <div className="container">
      <Link to="/erfassen"> {/* Hinzugefügte Link-Komponente */}
        <Box
          title="Erfassen"
          text="Hier kannst du Artikel erfassen und dann in die Datenbank kopieren."
          onClick={() => handleBoxClick('Erfassen')}
        />
      </Link>
      <Link to="/inserieren">
      <Box
        title="Inserieren"
        text="Hier kannst du den Inhalt von der Datenbank einfügen in die Vorlagen und dann generieren lassen."
        onClick={() => handleBoxClick('Inserieren')}
      />
      </Link>
    </div>
  );
}

function Box({ title, text, onClick }) {
  return (
    <div>
      <button className="box" onClick={onClick}>
        <p><strong>{title}</strong></p>
        <p>{text}</p>
      </button>
    </div>
  );
}

export default Mainsite;
