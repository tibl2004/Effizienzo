import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Tagesplanung.scss";

function Tagesplanung() {
    const [boxes, setBoxes] = useState([]);

    useEffect(() => {
        axios.get("https://users-8a52.onrender.com/boxes")
            .then((response) => {
                setBoxes(response.data);
            })
            .catch((error) => {
                console.error("Fehler beim Abrufen der Daten: ", error);
            });
    }, []);

    return (
        <div className="App">
            <h1>Tagesplanung</h1>
            <div className="box-container">
                {boxes.map((box, index) => (
                    <div key={index} className="aufgaben" style={{ backgroundColor: box.backgroundColor }}>
                        <p>{box.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Tagesplanung;
