// Auswahlkategorie.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './AuswahlButtons.scss';
import axios from 'axios';
import { faPaintBrush, faStamp, faPlus } from '@fortawesome/free-solid-svg-icons';

function Box(props) {
  return (
    <div className="category-box">
      <FontAwesomeIcon icon={props.icon} size="2x" />
      <h2 className='title'>{props.title}</h2>
      <p>{props.text}</p>
    </div>
  );
}

function Auswahlkategorie() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/inserieren')
      .then(response => {
        const titles = response.data.map(item => item.titel);
        setCategories(titles);
      })
      .catch(error => console.error('Fehler beim Abrufen der Kategorien:', error));
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredCategories = categories.filter((category) =>
    category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className='title'>
        <h2>Kategorien</h2>
      </div>
      <div className="search-bar">
        <input
          type="text"
          className='filter'
          placeholder="Suche nach Kategorien..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <div className="category-buttons">
        <Link to="/neues-inserat">
          <div className="category-box">
            <FontAwesomeIcon icon={faPlus} size="2x" />
            <h2 className='title'>Neues Inserat hinzufügen</h2>
          </div>
        </Link>
        {filteredCategories.map((category, index) => (
          <Link key={index} to={`/details/${category}`}>
            <Box
              icon={getIconForCategory(category)}
              title={category}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

function getIconForCategory(category) {
  if (category === "Bastelartikel") return faPaintBrush;
  if (category === "Briefmarken") return faStamp;
  // weitere Bedingungen für andere Kategorien hinzufügen
}

export default Auswahlkategorie;
