import React, { useState, useEffect } from 'react';
import './LogComponent.scss';

const LogComponent = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const handlePostRequest = () => {
      // Hier würde der tatsächliche POST-Request-Code stehen
      // Annahme: Der POST-Request wird auf localhost:4000/erfassen gemacht
      const now = new Date();
      const log = `Es wurde eine POST-Anfrage auf localhost:4000/erfassen gesendet - ${now.toLocaleString()}`;
      setLogs(prevLogs => [...prevLogs, log]);
    };

    // Initialisierung des Protokolls für POST-Request
    handlePostRequest();

  }, []); // Diese Funktion wird nur einmal nach der Montage ausgeführt

  return (
    <div className="log-component">
      <h2>Anfrageprotokoll:</h2>
      <ul>
        {logs.map((log, index) => (
          <li key={index}>{log}</li>
        ))}
      </ul>
    </div>
  );
};

export default LogComponent;
