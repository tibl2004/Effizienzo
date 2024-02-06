import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Mainsite.scss';

function Mainsite() {
  const [updates, setUpdates] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [begruessung, setBegruessung] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [username, setUsername] = useState('');
  const [userRating, setUserRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState('');
  const [showFeedbackForm, setShowFeedbackForm] = useState(true);
  const [showThankYou, setShowThankYou] = useState(false);

  const sendEmail = (email) => {
    window.location.href = `mailto:${email}`;
  };

  const location = useLocation();

  useEffect(() => {
    axios.get('http://localhost:4000/updates')
      .then(response => {
        setUpdates(response.data);
      })
      .catch(error => {
        console.error('Fehler beim Abrufen der Updates:', error);
      });

    axios.get('http://localhost:4000/dokumente')
      .then(response => {
        setDocuments(response.data);
      })
      .catch(error => {
        console.error('Fehler beim Abrufen der Dokumente:', error);
      });

    axios.get('http://localhost:4000/teammembers')
      .then(response => {
        setTeamMembers(response.data);
      })
      .catch(error => {
        console.error('Fehler beim Abrufen der Teammitglieder:', error);
      });

    axios.get('http://localhost:4000/begruessung')
      .then(response => {
        setBegruessung(response.data);
      })
      .catch(error => {
        console.error('Fehler beim Abrufen der Begrüßungsnachricht:', error);
      });

  }, []);

  const parseDate = (dateString) => {
    const [day, month, year] = dateString.split('.');
    return `${year}-${month}-${day}`;
  };

  const handleRatingChange = (newRating) => {
    setUserRating(newRating);
  };

  const handleFeedbackChange = (event) => {
    setFeedbackText(event.target.value);
  };

  const sendFeedback = () => {
    axios.post('http://localhost:4000/feedbacks', {
      rating: userRating,
      feedbackText: feedbackText
    })
      .then(response => {
        console.log('Feedback erfolgreich gesendet:', response.data);
        setShowFeedbackForm(false);
        setShowThankYou(true); // Dankesnachricht anzeigen
        setTimeout(() => {
          setShowThankYou(false); // Dankesnachricht ausblenden
          setTimeout(() => {
            setShowFeedbackForm(true); // Feedback-Formular wieder anzeigen
            setFeedbackText('');
            setUserRating(0);
          }, 500); // Kurze Verzögerung, um ein Flackern zu vermeiden
        }, 3000); // Dankesnachricht für 3 Sekunden anzeigen
      })
      .catch(error => {
        console.error('Fehler beim Senden des Feedbacks:', error);
      });
  };


  const handleDocumentClick = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div className="container">
      <div className="welcome-container" style={{ gridColumn: 'span 1', gridRow: 'span 1' }}>
        <h2 className="hello-message">Lieber Benutzer</h2>
        <div className='begruessung'>
          {begruessung.map((begruessung) => (
            <div key={begruessung.id} className="begruessung">
              <p>{begruessung.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className='feedback-container' style={{ gridColumn: 'span 1', gridRow: 'span 1' }}>
        {showFeedbackForm && (
          <div className={`feedback-form ${showFeedbackForm ? 'fade-in' : 'fade-out'}`}>
            <>
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
              <input type="text" value={feedbackText} onChange={handleFeedbackChange} />
              <button onClick={sendFeedback}>Senden</button>
            </>
          </div>
        )}

        {showThankYou && (
          <div className={`thank-you ${showThankYou ? 'fade-in' : 'fade-out'}`}>
            <p>Vielen Dank für dein Feedback!</p>
          </div>
        )}
      </div>




      <div className="team-container" style={{ gridColumn: 'span 1', gridRow: 'span 2' }}>
        {teamMembers.map((teammitglied) => (
          <div key={teammitglied.id} className="team-mitglied">
            <div className="profilbild">
              <img src={teammitglied.bildUrl} alt={`${teammitglied.vorname} ${teammitglied.nachname}`} />
            </div>
            <div className="mitglied-info">
              <p>{`${teammitglied.vorname} ${teammitglied.nachname}`}</p>
              <p>Email: {teammitglied.email}</p>
              <p>Telefonnummer: <a href={`tel:${teammitglied.telefonnummer}`}>{teammitglied.telefonnummer}</a></p>
              <button onClick={() => sendEmail(teammitglied.email)}>E-Mail</button>
            </div>
          </div>
        ))}
      </div>

      <div className='dokumente-container' style={{ gridColumn: 'span 1', gridRow: 'span 1' }}>
        <h3>Dokumente</h3>
        <div className='dokumente'>
          {documents.map((dokument) => (
            <div key={dokument.id} className="dokument" onClick={() => handleDocumentClick(dokument.url)}>
              <p>{dokument.name}</p>
            </div>
          ))}
        </div>
      </div>

      <div className='updates-container' style={{ gridColumn: 'span 1', gridRow: 'span 1' }}>
        <h3>Updates</h3>
        <div className='updates'>
          {updates.map((update, index) => (
            <React.Fragment key={update.id}>
              <Update datum={update.datum} title={update.titel} text={update.text} />
            </React.Fragment>
          ))}
        </div>
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
