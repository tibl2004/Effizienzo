import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './AuswahlButtons.scss';


import {
  faPaintBrush,
  faStamp,
  faBook,
  faMicrochip,
  faCompactDisc,
  faTshirt,
  faHeadphones,
  faShoePrints,
  faChess,
  faPhone,
  faImage,
  faShirt,
  faCouch
} from '@fortawesome/free-solid-svg-icons';

function Box(props) {
  return (
    <div className="category-box" onClick={props.onClick}>
      <FontAwesomeIcon icon={props.icon} />
      <h2>{props.title}</h2>
      <p>{props.text}</p>
    </div>
  );
}

function Auswahlkategorie() {
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { icon: faPaintBrush, title: "Bastelartikel", to: "/bastelartikel" },
    { icon: faStamp, title: "Briefmarken", to: "/briefmarken" },
    { icon: faBook, title: "Bücher & Comics", to: "/buecher" },
    { icon: faMicrochip, title: "Druckerzubehör", to: "/druckerzubehoer" },
    { icon: faCompactDisc, title: "DVD - Blue Ray Player", to: "/dvd" },
    { title: "Geschirr", to: "/geschirr" },
    { icon: faTshirt, title: "Kleidung", to: "/kleidung" },
    { icon: faHeadphones, title: "Kopfhörer", to: "/kopfhoerer" },
    { icon: faShoePrints, title: "Schuhe", to: "/schuhe" },
    { icon: faChess, title: "Spiele", to: "/spiele" },
    { icon: faPhone, title: "Schutzhüllen für Smartphone", to: "/schutzhuellensmartphone" },
    { icon: faImage, title: "Bilderrahmen / Bilder", to: "/bilder" },
    { icon: faShirt, title: "Kopfbedeckung", to: "/kopfbedeckungen" },
    { icon: faCouch, title: "Möbel", to: "/moebel"},
    {title: "Kerzenständer", to: "/kerzenstaender" } // Using FaCandle here
  ];

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredCategories = categories.filter((category) =>
    category.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Suche nach Kategorien..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <div className="category-buttons">
        {filteredCategories.map((category, index) => (
          <Link key={index} to={category.to}>
            <Box
              icon={category.icon}
              title={category.title}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Auswahlkategorie;
