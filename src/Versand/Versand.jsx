import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Versand.scss';

function Versand() {
  const [briefe, setBriefe] = useState([]); // State-Variable wurde korrekt benannt
  const [pakete, setPakete] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/briefe')
      .then(response => {
        setBriefe(response.data);
      })
      .catch(error => {
        console.error('Fehler beim Abrufen der Briefe:', error);
      });

    axios.get('http://localhost:4000/pakete')
      .then(response => {
        setPakete(response.data);
      })
      .catch(error => {
        console.error('Fehler beim Abrufen der Pakete:', error);
      });
  }, []);

  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (id, text) => {
    const [, amount] = text.split(' ');

    const tempInput = document.createElement('input');
    tempInput.value = amount;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);

    setCopiedId(id);

    setTimeout(() => {
      setCopiedId(null);
    }, 3000);
  };

  return (
    <div className='Versand'>
      <h1>Versand</h1>

      <h2>Briefe</h2>

      <table border="1" className="versand-table">
        <thead>
          <tr>
            <th>Format</th>
            <th>Dicke *</th>
            <th>Gewicht</th>
            <th>Portokosten Post</th>
            <th>Faktura-Preis **</th>
          </tr>
        </thead>
        <tbody>
          {briefe.map((brief) => (
            <tr key={brief.id}>
              <td>{brief.format}</td>
              <td>{brief.dicke}</td>
              <td>{brief.gewicht}</td>
              <td>{brief.porto}</td>
              <td
                id={`fak-${brief.id}`}
                onClick={() => handleCopy(`fak-${brief.id}`, brief.faktura)}
                className={`${brief.specialClass} ${copiedId === `fak-${brief.id}` ? 'copied' : ''}`}
              >
                {brief.faktura}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p>* Dicke = Kuvert + Inhalt</p>
      <p>** Faktura-Preis = Portokosten Post + Zuschlag für Verpackungsmaterial</p>

      <h2>Pakete</h2>

      <table border="1" className='pakete-table'>
        <thead>
          <tr>
            <th>Masse</th>
            <th>Gewicht</th>
            <th>Portokosten Post</th>
            <th>Faktura-Preis</th>
          </tr>
        </thead>
        <tbody>
          {pakete.map((paket, index) => (
            <tr key={paket.id}>
              {index === 0 ? (
                <>
                  <td rowSpan={pakete.length}>{paket.masse}</td>
                </>
              ) : null}
              <td>{paket.gewicht}</td>
              <td>{paket.portopost}</td>
              <td
                id={`paket-${paket.id}`}
                onClick={() => handleCopy(`paket-${paket.id}`, paket.faktura)}
                className={`${paket.specialClass} ${copiedId === `paket-${paket.id}` ? 'copied' : ''}`}
              >
                {paket.faktura}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Versand;
