import React, { useState, useEffect } from 'react';
import './Clock.scss'; // Importiere die CSS-Datei für das Styling

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  // Formatiere die Zeit in zwei Stellen (z.B. 09:05:02)
  const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return (
    <div className="digital-clock">
      <div className="time">{formattedTime}</div>
    </div>
  );
};

export default Clock;
