// Offline.jsx

import React from 'react';
import { Link } from 'react-router-dom'; // Stelle sicher, dass react-router-dom installiert ist

import './Offline.scss'; // Korrigiere den Dateinamen, wenn nötig

const Offline = () => {
  return (
    <div className="offline-container">
      <h1>Effizienzo ist nun auf dieser Seite <h1 className='offlineRED'>Offline</h1></h1>
      <p>Klicke auf diesen Button unten um auf das NEUE Effizienzo zu kommen!</p>

      <Link to="https://effizienzo.vercel.app/" className="custom-link">
        Gehe zum neuen Effizienzo
      </Link>
    </div>
  );
};

export default Offline;
