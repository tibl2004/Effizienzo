import React from 'react';
import './Status.scss';

const Status = () => {
    const stations = [
        { id: 1, station: "zum Erfassen" },
        { id: 2, station: "zum Fotografieren" },
        { id: 3, station: "zum Inserieren" },
        { id: 4, station: "zum Freigeben" },
    ];

    const online = [
        { id: 1, kiste: "1. Werkzeuge" },
        {}
    ]

    // Funktion zum Kopieren des Textes in die Zwischenablage
    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        alert(`Text "${text}" wurde in die Zwischenablage kopiert!`);
    };

    return (
        <div>
            <h1>Status</h1>
            {stations.map((station) => (
                <div key={station.id}>
                    <p>ID: {station.id}</p>
                    <p>Station: {station.station}</p>
                    <button onClick={() => handleCopy(station.station)}>
                        Kopieren
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Status;
