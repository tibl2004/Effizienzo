import React from 'react';
import './Vorlagen.scss';
import { Link } from 'react-router-dom';

function Vorlagen() {
    const handleBoxClick = (title) => {
        // Füge hier deine Logik ein, die ausgeführt wird, wenn auf eine Box geklickt wird.
        console.log(`Box "${title}" wurde geklickt.`);
    };

    return (
        <div className="container">
            <Link to="/spenden">
                <Box
                    title="Spenden"
                    text="Hier kannst du das Mail vorbereiten um den Kunden zu informieren, dass seine Ware an das Berner Brocki gespendet wird!"
                    onClick={() => handleBoxClick('Spenden')}
                />
            </Link>
            <Link to="/abholung">
                <Box
                    title="Abholung"
                    text="Hier kannst du das Mail vorbereiten für den Kunden der die Artikel abholen kann nach dem Nicht Verkauf!"
                    onClick={() => handleBoxClick('Abholung')}
                />
            </Link>
        </div>
    );
}

function Box({ title, text, onClick }) {
    return (
        <div>
            <button className="box" onClick={onClick}>
                <p>
                    <strong>{title}</strong>
                    <p>{text}</p>
                </p>
                <p>{text}</p>
            </button>
        </div>
    );
}

export default Vorlagen;
