import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Mainsite.scss';
import alex from './alex.jpg';

function Mainsite() {
  const [updates, setUpdates] = useState([]);
  const [username, setUsername] = useState('');
  const [userRating, setUserRating] = useState(0);
  const [teamMembers, setTeamMembers] = useState([
    { id: 1, vorname: 'Alexandra', nachname: 'Hofmann', email: 'alexandra.hofmann@gewa.ch', bildUrl: alex },
    { id: 2, vorname: 'Maria', nachname: 'Musterfrau', email: 'maria.musterfrau@example.com', bildUrl: 'maria.jpg' },
  ]);

  const sendeEmail = (email) => {
    // Öffne eine Outlook-E-Mail mit der ausgewählten E-Mail-Adresse
    window.location.href = `mailto:${email}`;
  };

  const location = useLocation();

  useEffect(() => {
    const mockUpdates = [
      { id: 2, version: "V.4.7", datum: "18.12.2023", title: 'Ricardo Beschreibung zusammengenerieren lassen', text: 'Man kann nun die Beschreibungen für das Inserat ganz einfach zusammen generieren. Sehr simpel und einfach. Viel Spaß' },
      { id: 1, version: "V.4.8", datum: "21.12.2023", title: 'Wichtige Sachen hinzugefügt', text: 'Es ist wichtig, dass ihr den Artikeln so viele Details wie möglich hinzufügt. Sonstige weiterführende Informationen müssen ebenfalls hinzugefügt werden.' },
      { id: 3, version: "V.4.9", datum: "04.01.2024", title: 'Neues Design und diverse Änderungen', text: 'Es hat ein paar Löschungen von Seiten gegeben dafür auch ein schöneres Design und es hat in der Navbar keine Subnavbar Elemente mehr.' },
    ];
    
    const sortedUpdates = mockUpdates.sort((a, b) => new Date(parseDate(b.datum)) - new Date(parseDate(a.datum)));
    setUpdates(sortedUpdates);
  }, []);

  const parseDate = (dateString) => {
    const [day, month, year] = dateString.split('.');
    return `${year}-${month}-${day}`;
  };

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

      <div className="team-container">
        {teamMembers.map((mitglied) => (
          <div key={mitglied.id} className="team-mitglied">
            <div className="profilbild">
              <img src={mitglied.bildUrl} alt={`${mitglied.vorname} ${mitglied.nachname}`} />
            </div>
            <div className="mitglied-info">
              <p>{`${mitglied.vorname} ${mitglied.nachname}`}</p>
              <button onClick={() => sendeEmail(mitglied.email)}>E-Mail</button>
            </div>
          </div>
        ))}
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
