import React from 'react';
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
    faBackpack,
    faGamepad, // Hinzugefügt
    faKeyboard, // Hinzugefügt
} from '@fortawesome/free-solid-svg-icons';

import { faVase } from '@fortawesome/free-solid-svg-icons';


const categories = [
    { name: 'Bastelartikel', icon: faPaintBrush },
    { name: 'Bilderrahmen-Bilder', icon: faImage },
    { name: 'Brautkleid', icon: faRing },
    { name: 'Briefmarken', icon: faStamp },
    { name: 'Bücher & Comics', icon: faBook },
    { name: 'Drucker', icon: faPrint },
    { name: 'Druckerzubehör', icon: faMicrochip },
    { name: 'DVD - Blue Ray Player', icon: faCompactDisc },
    { name: 'Fahrrad Shorts', icon: faBicycle },
    { name: 'Games - Konsolen', icon: faGamepad }, // Nur einmal verwenden
    { name: 'HP Laserjet Druckerpatronen', icon: faPrint },
    { name: 'Kaffeemaschine', icon: faCoffee },
    { name: 'Kerzenständer', icon: faCoffee },
    { name: 'Kleidung', icon: faTshirt },
    { name: 'Kopfbedeckungen', icon: faCoffee }, // Hinzugefügt
    { name: 'Kopfhörer', icon: faHeadphones },
    { name: 'Kopfkissen - Decken', icon: faBed },
    { name: 'Migros Sprayer 0.5L', icon: faSprayCan },
    { name: 'Möbel', icon: faCouch },
    { name: 'Modelleisenbahnen - Zubehör', icon: faTrain },
    { name: 'Monitore - TV', icon: faTv },
    { name: 'Musikinstrumente', icon: faGuitar },
    { name: 'NES LCD-Projektor', icon: faProjectDiagram },
    { name: 'Plüschtiere', icon: faChess },
    { name: 'Portemonnaie', icon: faWallet },
    { name: "Schallplatten", icon: faRecordVinyl },
    { name: "Schmuck - Uhren", icon: faGem },
    { name: "Schuhe", icon: faShoePrints },
    { name: "Schutzhüllen Smartphone", icon: faMobileAlt },
    { name: "Skulpturen - Figuren", icon: faChess },
    { name: "Spiele", icon: faGamepad }, // Nur einmal verwenden
    { name: "Steinschmuck Maru's", icon: faGem },
    { name: "Tasche - Rucksack", icon: faCoffee },
    { name: "Tastatur", icon: faKeyboard }, // Hinzugefügt
    { name: "Vasen - Gefässe", icon: faCoffee },
    { name: "Wanduhren - Standuhren", icon: faClock },
    { name: "Werkzeug", icon: faTools },
];


function Auswahlkategorie() {
    return (
        <div className="category-buttons">
            {categories.map((category, index) => (
                <button key={index}>
                    <FontAwesomeIcon icon={category.icon} />
                    {category.name}
                </button>
            ))}
        </div>
    );
}

export default Auswahlkategorie;
