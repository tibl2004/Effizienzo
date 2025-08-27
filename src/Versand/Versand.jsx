import React, { useState } from 'react';
import './Versand.scss';

function Versand() {
  const tableData = [
    { id: 1, format: 'B5', dicke: '2 cm', gewicht: '1 - 100g', porto: 'CHF 1.00', faktura: 'CHF 1.50', special: true },
    { id: 2, format: '', dicke: '', gewicht: '101 - 500g', porto: 'CHF 1.40', faktura: 'CHF 1.90' },
    { id: 3, format: '', dicke: '2 - 5 cm', gewicht: '1 - 100g', porto: 'CHF 3.00', faktura: 'CHF 3.50' },
    { id: 4, format: '', dicke: '', gewicht: '101 - 500g', porto: 'CHF 3.40', faktura: 'CHF 3.90' },
    { id: 5, format: 'Grossbrief (bis B4)', dicke: '2 cm', gewicht: '1 - 500 g', porto: 'CHF 2.00', faktura: 'CHF 2.50', special: true },
    { id: 6, format: '', dicke: '', gewicht: '501 - 1000 g', porto: 'CHF 2.00', faktura: 'CHF 2.50' },
  ];

  const pakete = [
    { id: 1, masse: 'Unter Sperrgutgrösse!', gewicht: 'Bis 5 kg', portopost: 'CHF 8.50', faktura: 'CHF 10.10', special: true },
    { id: 2, masse: '', gewicht: 'Bis 10 kg', portopost: 'CHF 11.50', faktura: 'CHF 13.10', special: true },
    { id: 3, masse: '', gewicht: 'Bis 30 kg', portopost: 'CHF 20.50', faktura: 'CHF 22.10', special: true },
  ];

  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text.split(' ')[1]).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  return (
    <div className='Versand'>
      <h1>Versandinformationen</h1>

      <table className="versand-table">
        <thead>
          <tr>
            <th>Format</th>
            <th>Dicke *</th>
            <th>Gewicht</th>
            <th>Porto</th>
            <th>Faktura **</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map(row => (
            <tr key={row.id}>
              <td>{row.format}</td>
              <td>{row.dicke}</td>
              <td>{row.gewicht}</td>
              <td>{row.porto}</td>
              <td
                className={row.special ? 'special-cell' : 'copy-cell'}
                onClick={() => handleCopy(`fak-${row.id}`, row.faktura)}
              >
                {row.faktura}
                {copiedId === `fak-${row.id}` && <span className="copied-tooltip">Kopiert!</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p>* Dicke = Kuvert + Inhalt</p>
      <p>** Faktura = Portokosten + Verpackungszuschlag</p>

      <h2>Pakete</h2>

      <table className="pakete-table">
        <thead>
          <tr>
            <th>Masse</th>
            <th>Gewicht</th>
            <th>Porto</th>
            <th>Faktura</th>
          </tr>
        </thead>
        <tbody>
          {pakete.map((paket, index) => (
            <tr key={paket.id}>
              {index === 0 && <td rowSpan={pakete.length}>{paket.masse}</td>}
              <td>{paket.gewicht}</td>
              <td>{paket.portopost}</td>
              <td
                className={paket.special ? 'special-cell' : 'copy-cell'}
                onClick={() => handleCopy(`paket-${paket.id}`, paket.faktura)}
              >
                {paket.faktura}
                {copiedId === `paket-${paket.id}` && <span className="copied-tooltip">Kopiert!</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Versand;
