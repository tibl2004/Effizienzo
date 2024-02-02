import React, { useState } from 'react';
import * as XLSX from 'xlsx'; // Importieren der XLSX-Bibliothek für Excel-Export

function Kassabuch() {
  const [transactions, setTransactions] = useState(Array(43).fill().map(() => ({
    datum: '',
    TextRechnungsnummerName: '',
    soll: 0,
    haben: 0,
    saldo: 0 // Neues Feld für den Saldo hinzugefügt
  })));

  const [initialSaldo, setInitialSaldo] = useState(0); // State-Variable für den anfänglichen Saldo
  const [showSaldoInput, setShowSaldoInput] = useState(true);

  const updateTransaction = (index, field, value) => {
    setTransactions(prevTransactions => {
      const newTransactions = [...prevTransactions];
      newTransactions[index][field] = value;
      // Berechne den Saldo basierend auf den aktuellen Werten von Soll und Haben
      let saldo = initialSaldo;
      for (let i = 0; i <= index; i++) {
        saldo += newTransactions[i].soll - newTransactions[i].haben;
      }
      newTransactions[index].saldo = saldo;
      return newTransactions;
    });
  };

  const updateNumericValue = (index, field, value) => {
    setTransactions(prevTransactions => {
      const newTransactions = [...prevTransactions];
      newTransactions[index][field] = parseFloat(value);
      // Berechne den Saldo basierend auf den aktuellen Werten von Soll und Haben
      let saldo = initialSaldo;
      for (let i = 0; i <= index; i++) {
        saldo += newTransactions[i].soll - newTransactions[i].haben;
      }
      newTransactions[index].saldo = saldo;
      return newTransactions;
    });
  };

  const saveSaldo = (index, value) => {
    setInitialSaldo(parseFloat(value)); // Setze den anfänglichen Saldo
    setShowSaldoInput(false);
  };

  // Funktion zum Exportieren der Daten in eine Excel-Datei
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(transactions);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Transactions');
    XLSX.writeFile(workbook, 'transactions.xlsx');
  };

  const rows = transactions.map((transaction, index) => {
    const { datum, TextRechnungsnummerName, soll, haben, saldo } = transaction; // Saldo aus dem transaction-Objekt erhalten
    return (
      <tr key={index}>
        <td>
          <input
            type="text"
            value={datum}
            onChange={e => updateTransaction(index, 'Datum', e.target.value)}
          />
        </td>
        <td>
          <input
            type="text"
            value={TextRechnungsnummerName}
            onChange={e => updateTransaction(index, 'Text / Rechnungsnummer / Name', e.target.value)}
          />
        </td>
        <td>
          <input
            type="number"
            value={soll}
            onChange={e => updateNumericValue(index, 'Soll', e.target.value)}
          />
        </td>
        <td>
          <input
            type="number"
            value={haben}
            onChange={e => updateNumericValue(index, 'Haben', e.target.value)}
          />
        </td>
        <td>
          {showSaldoInput && index === 0 ? (
            <input
              type="number"
              value={initialSaldo}
              onChange={e => setInitialSaldo(parseFloat(e.target.value))}
              onBlur={e => saveSaldo(index, e.target.value)}
            />
          ) : (
            saldo
          )}
        </td>
        <td>Visum</td>
      </tr>
    );
  });

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Datum</th>
            <th>Text / Rechnungsnummer / Name</th>
            <th>Soll</th>
            <th>Haben</th>
            <th>Saldo</th>
            <th>Visum</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
      <button onClick={exportToExcel}>In Excel exportieren</button>
    </div>
  );
}

export default Kassabuch;
