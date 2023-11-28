import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Mainsite.scss';

function Mainsite() {
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    // Mock data for demonstration purposes
    const mockUpdates = [
      { id: 1, datum: "28.11.2023", title: 'Home Seite Neues Design', text: 'Die Home Seite hat ein neues Design bekommen.' },
      { id: 2, datum: "29.11.2023", title: 'Login Fertig gestellt', text: 'Das Login wurde fertiggestellt und jeder Benutzer muss sich einloggen.' },

      
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

  return (
    <div className="container">
      <h2 className="hello-message">Lieber Benutzer</h2>


      <div className='updates-container'>
        <h3>Updates</h3>
        <div className='updates'>
          {updates.map((update, index) => (
            <React.Fragment key={update.id}>
              <Update datum={update.datum} title={update.title} text={update.text} />
              {index !== updates.length - 1 && <hr />} {/* Display horizontal line if not the last update */}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

function Update({ datum, title, text }) {
  return (
    <div>
      <div className="Update">
        <p><em>{datum}</em></p>
        <p><strong>{title}</strong></p>
        <p>{text}</p>
      </div>
    </div>
  );
}



export default Mainsite;
