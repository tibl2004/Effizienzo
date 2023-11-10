import React, { useState } from 'react';
import './Versand.scss';

function Versand() {
    const tableData = [
        { id: 1, format: 'B5', dicke: '2 cm', gewicht: '1 - 100g', porto: 'CHF 0.90', faktura: 'CHF 1.05' },
        { id: 2, format: '', dicke: '', gewicht: '101 - 250g', porto: 'CHF 1.15', faktura: 'CHF 1.55' },
        { id: 3, format: '', dicke: '2 - 5 cm', gewicht: '1 - 100g', porto: 'CHF 2.40', faktura: 'CHF 2.55' },
        { id: 4, format: '', dicke: '', gewicht: '101 - 250g', porto: 'CHF 2.65', faktura: 'CHF 3.05' },
        { id: 5, format: 'Grossbrief (bis B4)', dicke: '2 cm', gewicht: '1 - 500 g', porto: 'CHF 1.85', faktura: 'CHF 2.55' },
        { id: 6, format: '', dicke: '', gewicht: '501 - 1000 g', porto: 'CHF 3.65', faktura: 'CHF 4.05' },
    ];

    const [copiedId, setCopiedId] = useState(null);

    const handleCopy = (id, text) => {
        const [, amount] = text.split(' '); // Splitten nach Leerzeichen und nur die zweite Hälfte (Betrag) verwenden
    
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

            <table border="1">
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
                                onClick={() => handleCopy(rowData.id, rowData.faktura)}
                                className={copiedId === rowData.id ? 'copied' : ''}
                            >
                                {rowData.faktura}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <p>* Dicke = Kuvert + Inhalt</p>
            <p>** Faktura-Preis = Portokosten Post + Zuschlag für Verpackungsmaterial</p>
        </div>
    );
}

export default Versand;
