// Versand.jsx

import React, { useState } from 'react';
import './Versand.scss';

function Versand() {
  const tableData = [
    { id: 1, format: 'B5', dicke: '2 cm', gewicht: '1 - 100g', porto: 'CHF 1.00', faktura: 'CHF 1.50' },
    { id: 2, format: '', dicke: '', gewicht: '101 - 500g', porto: 'CHF 1.40', faktura: 'CHF 1.90' },
    { id: 3, format: '', dicke: '2 - 5 cm', gewicht: '1 - 100g', porto: 'CHF 3.00', faktura: 'CHF 3.50' },
    { id: 4, format: '', dicke: '', gewicht: '101 - 250g', porto: 'CHF 3.40', faktura: 'CHF 3.90' },
    { id: 5, format: 'Grossbrief (bis B4)', dicke: '2 cm', gewicht: '1 - 500 g', porto: 'CHF 2.00', faktura: 'CHF 2.50' },
    { id: 6, format: '', dicke: '', gewicht: '501 - 1000 g', porto: 'CHF 2.00', faktura: 'CHF 2.50' },
  ];

  const pakete = [
    { id: 1, masse: 'Unter Sperrgutgrösse!', gewicht: 'Bis 5 kg', portopost: 'CHF 8.50', faktura: 'CHF 10.10' },
    { id: 2, masse: '', gewicht: 'Bis 10 kg', portopost: 'CHF 11.50', faktura: 'CHF 13.10'},
    { id: 3, masse: '', gewicht: 'Bis 30 kg', portopost: 'CHF 20.50', faktura: 'CHF 22.10'},
  ];

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

  const handlePaketPrice = (id, text) => {
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
    <div>
      <h1>Versand</h1>

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
          {tableData.map((rowData) => (
            <tr key={rowData.id}>
              <td>{rowData.format}</td>
              <td>{rowData.dicke}</td>
              <td>{rowData.gewicht}</td>
              <td>{rowData.porto}</td>
              <td
                id={`fak-${rowData.id}`}
                onClick={() => handleCopy(`fak-${rowData.id}`, rowData.faktura)}
                className={copiedId === `fak-${rowData.id}` ? 'copied' : ''}
              >
                {rowData.faktura}
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
                onClick={() => handlePaketPrice(`paket-${paket.id}`, paket.faktura)}
                className={copiedId === `paket-${paket.id}` ? 'copied' : ''}
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
