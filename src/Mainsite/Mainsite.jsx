import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Mainsite.scss';
import Navbar from '../Navbar/Navbar';
import { Link } from 'react-router-dom';

function Mainsite() {
  const handleBoxClick = (title) => {
    // Add your logic here to execute when a box is clicked.
    console.log(`Box "${title}" was clicked.`);
  };

  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    // Fetch user data to determine the logged-in user
    axios.get('https://users-8a52.onrender.com/users')
      .then(response => {
        const users = response.data;
        const loggedInUser = users.find(user => user.loggedIn);
        if (loggedInUser) {
          setLoggedInUser(loggedInUser);
        }
      })
      .catch(error => {
        console.error('Error fetching the logged-in user: ', error);
      });
  }, []);

  return (
    <div className="container">
      <Link to="/erfassen">
        <Box
          title="Erfassen"
          text="Hier kannst du Artikel erfassen und dann in die Datenbank kopieren."
          onClick={() => handleBoxClick('Erfassen')}
        />
      </Link>
      <Link to="/inserieren">
        <Box
          title="Inserieren"
          text="Hier kannst du den Inhalt von der Datenbank einfügen in die Vorlagen und dann generieren lassen."
          onClick={() => handleBoxClick('Inserieren')}
        />
      </Link>
      <Link to="/reaktivierung">
        <Box
          title="Reaktivierung"
          text="Hier kannst du das aktuelle Datum für die Restwert Datenbank kopieren, ohne es jedes Mal einzugeben."
          onClick={() => handleBoxClick('Reaktivierung')}
        />
      </Link>

      {loggedInUser ? (
        <>
          <Link to="/Admins">
            <Box
              title="Admins"
              text="Hier kannst du die Admin Logins verwalten."
              onClick={() => handleBoxClick('Admins')}
            />
          </Link>
          <Link to="/tagesplanung">
            <Box
              title="Tagesplanung"
              text="Hier kannst du die Tagesplanung machen."
              onClick={() => handleBoxClick('Tagesplanung')}
            />
          </Link>
        </>
      ) : null}
    </div>
  );
}

function Box({ title, text, onClick }) {
  return (
    <div>
      <button className="box" onClick={onClick}>
        <p><strong>{title}</strong></p>
        <p>{text}</p>
      </button>
    </div>
)}

export default Mainsite;
