import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './AuswahlButtons.scss';

import {
  faPaintBrush,
  faImage,
  faRing,
  faStamp,
  faBook,
  faPrint,
  faMicrochip,
  faCompactDisc,
  faBicycle,
  faTshirt,
  faHeadphones,
  faBed,
  faSprayCan,
  faCouch,
  faTrain,
  faTv,
  faGuitar,
  faProjectDiagram,
  faChess,
  faRecordVinyl,
  faGem,
  faShoePrints,
  faMobileAlt,
  faWallet,
  faClock,
  faTools,
  faCoffee,
  faGamepad,
  faKeyboard,
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
  return (
    <div className="category-buttons">
      <Link to="/bastelartikel">
        <Box
          icon={faPaintBrush}
          title="Bastelartikel"
        />
      </Link>
      
      <Link to="/briefmarken">
        <Box
          icon={faStamp}
          title="Briefmarken"
        />
      </Link>
      <Link to="/buecher">
        <Box
          icon={faBook}
          title="Bücher & Comics"

        />
      </Link>
      
      <Link to="/druckerzubehoer">
        <Box
          icon={faMicrochip}
          title="Druckerzubehör"
        />
      </Link>
      <Link to="/dvd">
        <Box
          icon={faCompactDisc}
          title="DVD - Blue Ray Player"
        />
      </Link>
      
      <Link to="/geschirr">
        <Box
          title="Geschirr"
        />
      </Link>

      <Link to="/kleidung">
        <Box
          icon={faTshirt}
          title="Kleidung"
        />
      </Link>
      <Link to="/kopfhoerer">
      <Box
        icon={faHeadphones}
        title="Kopfhörer"
      />
      </Link>
      
      <Link to="/schuhe">
        <Box
          icon={faShoePrints}
          title="Schuhe"
        />
      </Link>
      <Link to="/spiele">
        <Box
          icon={faChess}
          title="Spiele"
        />
      </Link>
    </div>
  );
}

export default Auswahlkategorie;
