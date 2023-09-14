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
      <Box
        icon={faPaintBrush}
        title="Bastelartikel"
        text="Beschreibung für Bastelartikel."
      />
      <Box
        icon={faImage}
        title="Bilderrahmen-Bilder"
        text="Beschreibung für Bilderrahmen-Bilder."
      />
      <Box
        icon={faRing}
        title="Brautkleid"
        text="Beschreibung für Brautkleid."
      />
      <Box
        icon={faStamp}
        title="Briefmarken"
        text="Beschreibung für Briefmarken."
      />
      <Box
        icon={faBook}
        title="Bücher & Comics"
        text="Beschreibung für Bücher & Comics."
      />
      <Box
        icon={faPrint}
        title="Drucker"
        text="Beschreibung für Drucker."
      />
      <Box
        icon={faMicrochip}
        title="Druckerzubehör"
        text="Beschreibung für Druckerzubehör."
      />
      <Box
        icon={faCompactDisc}
        title="DVD - Blue Ray Player"
        text="Beschreibung für DVD - Blue Ray Player."
      />
      <Box
        icon={faBicycle}
        title="Fahrrad Shorts"
        text="Beschreibung für Fahrrad Shorts."
      />
      <Link to="/kleidung">
      <Box
        icon={faTshirt}
        title="Kleidung"
        text="Beschreibung für Kleidung."
      />
      </Link>
      <Box
        icon={faHeadphones}
        title="Kopfhörer"
        text="Beschreibung für Kopfhörer."
      />
      <Box
        icon={faBed}
        title="Kopfkissen - Decken"
        text="Beschreibung für Kopfkissen - Decken."
      />
      <Box
        icon={faSprayCan}
        title="Migros Sprayer 0.5L"
        text="Beschreibung für Migros Sprayer 0.5L."
      />
      <Box
        icon={faCouch}
        title="Möbel"
        text="Beschreibung für Möbel."
      />
      <Box
        icon={faTrain}
        title="Modelleisenbahnen - Zubehör"
        text="Beschreibung für Modelleisenbahnen - Zubehör."
      />
      <Box
        icon={faTv}
        title="Monitore - TV"
        text="Beschreibung für Monitore - TV."
      />
      <Box
        icon={faGuitar}
        title="Musikinstrumente"
        text="Beschreibung für Musikinstrumente."
      />
      <Box
        icon={faProjectDiagram}
        title="NES LCD-Projektor"
      />
      <Box
        icon={faChess}
        title="Plüschtiere"
        text="Beschreibung für Plüschtiere."
      />
      <Box
        icon={faWallet}
        title="Portemonnaie"
        text="Beschreibung für Portemonnaie."
      />
      <Box
        icon={faRecordVinyl}
        title="Schallplatten"
        text="Beschreibung für Schallplatten."
      />
      <Box
        icon={faGem}
        title="Schmuck - Uhren"
        text="Beschreibung für Schmuck - Uhren."
      />
      <Box
        icon={faShoePrints}
        title="Schuhe"
        text="Beschreibung für Schuhe."
      />
      <Box
        icon={faMobileAlt}
        title="Schutzhüllen Smartphone"
        text="Beschreibung für Schutzhüllen Smartphone."
      />
      <Box
        icon={faClock}
        title="Wanduhren - Standuhren"
        text="Beschreibung für Wanduhren - Standuhren."
      />
      <Box
        icon={faTools}
        title="Werkzeug"
        text="Beschreibung für Werkzeug."
      />
      <Box
        icon={faCoffee}
        title="Kaffeemaschine"
        text="Beschreibung für Kaffeemaschine."
      />
      <Box
        title="Tasche - Rucksack"
        text="Beschreibung für Tasche - Rucksack."
      />
      <Box
        icon={faGamepad}
        title="Games - Konsolen"
        text="Beschreibung für Games - Konsolen."
      />
      <Box
        icon={faKeyboard}
        title="Tastatur"
        text="Beschreibung für Tastatur."
      />
      <Box
        title="Vasen - Gefässe"
        text="Beschreibung für Vasen - Gefässe."
      />
    </div>
  );
}

export default Auswahlkategorie;
