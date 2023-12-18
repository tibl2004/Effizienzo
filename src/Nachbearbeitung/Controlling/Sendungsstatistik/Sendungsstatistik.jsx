import React, { useState } from 'react';

function Sendungsstatistik() {
  const months = [
    'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
    'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, index) => currentYear - index); // Zeigt die letzten 10 Jahre an

  const [selectedMonth, setSelectedMonth] = useState('Januar');
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleYearChange = (event) => {
    setSelectedYear(parseInt(event.target.value));
  };

  return (
    <div>
      <h1>Sendungsstatistik</h1>
      
      <label htmlFor="month">Monat:</label>
      <select id="month" value={selectedMonth} onChange={handleMonthChange}>
        {months.map((month, index) => (
          <option key={index} value={month}>{month}</option>
        ))}
      </select>

      <label htmlFor="year">Jahr:</label>
      <select id="year" value={selectedYear} onChange={handleYearChange}>
        {years.map((year) => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select>
      
      {/* Hier kannst du den Rest der Sendungsstatistik-Komponente ergänzen */}
    </div>
  );
}

export default Sendungsstatistik;
