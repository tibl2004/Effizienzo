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
      <Box
        icon={faImage}
        title="Bilderrahmen-Bilder"

      />
      <Box
        icon={faRing}
        title="Brautkleid"

      />
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
      <Box
        icon={faPrint}
        title="Drucker"
      />
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
      <Box
        icon={faBicycle}
        title="Fahrrad Shorts"
      />
      <Link to="/kleidung">
        <Box
          icon={faTshirt}
          title="Kleidung"
        />
      </Link>
      <Box
        icon={faHeadphones}
        title="Kopfhörer"
      />
      <Box
        icon={faBed}
        title="Kopfkissen - Decken"
      />
      <Box
        icon={faSprayCan}
        title="Migros Sprayer 0.5L"
      />
      <Box
        icon={faCouch}
        title="Möbel"
      />
      <Box
        icon={faTrain}
        title="Modelleisenbahnen - Zubehör"
      />
      <Box
        icon={faTv}
        title="Monitore - TV"
      />
      <Box
        icon={faGuitar}
        title="Musikinstrumente"
      />
      <Box
        icon={faProjectDiagram}
        title="NES LCD-Projektor"
      />
      <Box
        icon={faChess}
        title="Plüschtiere"
      />
      <Box
        icon={faWallet}
        title="Portemonnaie"

      />
      <Box
        icon={faRecordVinyl}
        title="Schallplatten"

      />
      <Box
        icon={faGem}
        title="Schmuck - Uhren"

      />
      <Link to="/schuhe">
        <Box
          icon={faShoePrints}
          title="Schuhe"
        />
      </Link>
      <Box
        icon={faMobileAlt}
        title="Schutzhüllen Smartphone"

      />
      <Box
        icon={faClock}
        title="Wanduhren - Standuhren"

      />
      <Box
        icon={faTools}
        title="Werkzeug"

      />
      <Box
        icon={faCoffee}
        title="Kaffeemaschine"

      />
      <Box
        title="Tasche - Rucksack"

      />
      <Box
        icon={faGamepad}
        title="Games - Konsolen"

      />
      <Box
        icon={faKeyboard}
        title="Tastatur"

      />
      <Box
        title="Vasen - Gefässe"
      />
    </div>
  );
}

export default Auswahlkategorie;
