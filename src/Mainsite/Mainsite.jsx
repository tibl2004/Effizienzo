// Mainsite.jsx

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Mainsite.scss';
import alex from './alex.jpg';
import nadja from './nadja.jpg';

function Mainsite() {
  const [updates, setUpdates] = useState([]);
  const [username, setUsername] = useState('');
  const [userRating, setUserRating] = useState(0);
  const [teamMembers, setTeamMembers] = useState([
    { id: 1, vorname: 'Alexandra', nachname: 'Hofmann', email: 'alexandra.hofmann@gewa.ch', telefonnummer: '031 919 13 98', bildUrl: alex },
    { id: 2, vorname: 'Nadja', nachname: 'Baraniak', email: 'nadja.baraniak@gewa.ch', telefonnummer: '031 919 13 39', bildUrl: nadja },
  ]);

  const [dokumente, setDokumente] = useState([
    { id: 1, name: "Anleitung 1 Artikelannahme und -erfassung", url: "https://gewastiftung.sharepoint.com/:w:/r/sites/PJ-Auftrag-Restwert/Freigegebene%20Dokumente/General/04%20Anleitungen/Anleitung%201%20Artikelannahme%20und%20-erfassung.docx?d=w8d43950df0934c7e86eb1a83542b1e02&csf=1&web=1&e=KTAyzX" },
    { id: 2, name: "Anleitung 2 Fotos", url: "https://gewastiftung.sharepoint.com/:w:/r/sites/PJ-Auftrag-Restwert/Freigegebene%20Dokumente/General/04%20Anleitungen/Anleitung%202%20Fotos.docx?d=w088cac87d1f24e56929111a57d18c58a&csf=1&web=1&e=5urIL3" },
    { id: 3, name: "Anleitung 3 Inserat erstellen", url: "https://gewastiftung.sharepoint.com/:w:/r/sites/PJ-Auftrag-Restwert/Freigegebene%20Dokumente/General/04%20Anleitungen/Anleitung%203%20Inserat%20erstellen.docx?d=w70817be684294661b887790d5b71ff51&csf=1&web=1&e=ebNSpE" },
    { id: 4, name: "Anleitung 4 Inserat freigeben", url: "https://gewastiftung.sharepoint.com/:w:/r/sites/PJ-Auftrag-Restwert/Freigegebene%20Dokumente/General/04%20Anleitungen/Anleitung%204%20Inserat%20freigeben.docx?d=wf9b92a333f92460fbe808c997c1898a6&csf=1&web=1&e=oWP09z" },
    { id: 5, name: "Anleitung 5 Versand und Lager", url: "https://gewastiftung.sharepoint.com/:w:/r/sites/PJ-Auftrag-Restwert/Freigegebene%20Dokumente/General/04%20Anleitungen/Anleitung%205%20Versand%20und%20Lager.docx?d=w2eaa45d526944da19410d564806bf188&csf=1&web=1&e=lCw0O7" },
    { id: 6, name: "Anleitung 6 E-Mails und Warenrückgabe", url: "https://gewastiftung.sharepoint.com/:w:/r/sites/PJ-Auftrag-Restwert/Freigegebene%20Dokumente/General/04%20Anleitungen/Anleitung%206%20E-Mails%20und%20Warenr%C3%BCckgabe.docx?d=w2223cad6f7b745c3b6df20d1fa237bf9&csf=1&web=1&e=KSuDDO" },
    { id: 7, name: "Anleitung 7 Buchhaltung", url: "https://gewastiftung.sharepoint.com/:w:/r/sites/PJ-Auftrag-Restwert/Freigegebene%20Dokumente/General/04%20Anleitungen/Anleitung%207%20Buchhaltung.docx?d=w8cf47af1a3a049cdbd41fceff1937804&csf=1&web=1&e=yhs3aP" }
  ]);


  const sendEmail = (email) => {
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
      <div className="welcome-container" style={{ gridColumn: 'span 1', gridRow: 'span 1' }}>
        <h2 className="hello-message">Lieber Benutzer</h2>
        <p className="muster-text">
          Herzlich willkommen auf Effizienzo! Ich freue mich, dass du dich entschieden hast, meine Plattform zu nutzen. Hier bei Effizienzo steht Effizienz an erster Stelle, und ich bin sicher, dass du viele nützliche Funktionen entdecken wirst.
        </p>
        <p className="muster-text">
          Wenn du Unterstützung benötigst oder Fragen hast, zögere nicht, dich an mich zu wenden. Ich stehe dir jederzeit zur Verfügung, um dir weiterzuhelfen. Mein Ziel ist es, sicherzustellen, dass deine Erfahrung auf Effizienzo so reibungslos und angenehm wie möglich ist.
        </p>
        <p className="muster-text">
          Viel Spaß beim Erkunden der Plattform und bei der Nutzung meiner verschiedenen Dienstleistungen.
        </p>
        <p className='muster-text'>
          Liebe Grüße,
          <br />
          Timo Blumer
        </p>
      </div>

      <div className='feedback-container' style={{ gridColumn: 'span 1', gridRow: 'span 1' }}>
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

      <div className="team-container" style={{ gridColumn: 'span 1', gridRow: 'span 2' }}>
        {teamMembers.map((mitglied) => (
          <div key={mitglied.id} className="team-mitglied">
            <div className="profilbild">
              <img src={mitglied.bildUrl} alt={`${mitglied.vorname} ${mitglied.nachname}`} />
            </div>
            <div className="mitglied-info">
              <p>{`${mitglied.vorname} ${mitglied.nachname}`}</p>
              <p>Email: {mitglied.email}</p>
              <p>Telefonnummer: <a href={`tel:${mitglied.telefonnummer}`}>{mitglied.telefonnummer}</a></p>
              <button onClick={() => sendEmail(mitglied.email)}>E-Mail</button>
            </div>
          </div>
        ))}
      </div>

      <div className="documents-container" style={{ gridColumn: 'span 1', gridRow: 'span 2' }}>
        <h3>Anleitungen</h3>
        {dokumente.map((dokument) => (
          <div key={dokument.id} className="dokument">
            <div className="dokument-info">
              <p><a href={dokument.url} target="_blank" rel="noopener noreferrer">{dokument.name}</a></p>
            </div>
          </div>
        ))}
      </div>


      <div className='updates-container' style={{ gridColumn: 'span 2', gridRow: 'span 2' }}>
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
