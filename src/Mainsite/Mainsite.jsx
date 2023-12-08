import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';
import './Mainsite.scss';

function Mainsite() {
  const [updates, setUpdates] = useState([]);
  const [username, setUsername] = useState('');
  const [userRating, setUserRating] = useState(0);

  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setUsername(searchParams.get('username') || '');
  }, [location.search]);

  useEffect(() => {
    // Mock data for demonstration purposes
    const mockUpdates = [
      { id: 1, datum: '28.11.2023', title: 'Home Seite Neues Design', text: 'Die Home Seite hat ein neues Design bekommen.' },
      { id: 2, datum: '29.11.2023', title: 'Login Fertig gestellt', text: 'Das Login wurde fertiggestellt und jeder Benutzer muss sich einloggen.' },
      // Add more updates as needed
    ];

    // Sort updates by date in descending order
    const sortedUpdates = mockUpdates.sort((a, b) => new Date(parseDate(b.datum)) - new Date(parseDate(a.datum)));

    setUpdates(sortedUpdates);
  }, []);

  // Function to parse date in DD.MM.YYYY format and return as YYYY-MM-DD
  const parseDate = (dateString) => {
    const [day, month, year] = dateString.split('.');
    return `${year}-${month}-${day}`;
  };

  // Callback function when the user rates
  const handleRatingChange = (newRating) => {
    setUserRating(newRating);
    // Hier könntest du den Bewertungswert an einen Server senden oder lokal speichern
  };

  return (
    <div className="container">
      <div className="welcome-container">
        <h2 className="hello-message">Lieber {username}</h2>
        <p className="muster-text">Herzlich willkommen auf Effizienzo! Schön, dass du dich entschieden hast, meine Plattform zu benutzen. Viel Spaß und bei Fragen komm einfach auf mich zu!</p>
        <p className='muster-text'>Liebe Grüße, Timo Blumer</p>
      </div>

      <div className='updates-container'>
        <h3>Updates</h3>
        <div className='updates'>
          {updates.map((update, index) => (
            <React.Fragment key={update.id}>
              <Update datum={update.datum} title={update.title} text={update.text} />
              {index !== updates.length - 1 && <hr />}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Feedback-Widget */}
      <div className='feedback-container'>
        <h3>Wie gefällt dir Effizienzo?</h3>
        <ReactStars
          count={5}
          onChange={handleRatingChange}
          size={30}
          value={userRating}
          isHalf={false}
          emptyIcon={<i className="far fa-star"></i>}
          fullIcon={<i className="fas fa-star"></i>}
          activeColor="#ffd700"
        />
      </div>
    </div>
  );
}

function Update({ datum, title, text }) {
  return (
    <div className="update">
      <p><em>{datum}</em></p>
      <p><strong>{title}</strong></p>
      <p>{text}</p>
    </div>
  );
}

export default Mainsite;
