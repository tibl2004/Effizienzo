import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Tagesplanung.scss";

function Tagesplanung() {
  const [boxes, setBoxes] = useState([]);
  const [inputName, setInputName] = useState(""); // Zustand für den eingegebenen Namen
  const [names, setNames] = useState([]); // Zustand für die Liste der Namen

  useEffect(() => {
    // Axios-Aufruf, um Boxen abzurufen
    axios.get("https://users-8a52.onrender.com/boxes")
      .then((response) => {
        setBoxes(response.data);
      })
      .catch((error) => {
        console.error("Fehler beim Abrufen der Daten: ", error);
        // Set a default value for boxes or handle the error in some way
        setBoxes([]);
      });
  }, []);

  const handleAddNameClick = () => {
    let name = prompt("Wie soll das Input-Feld heißen?");
    if (name !== null && name !== "") {
      // Fügen Sie den eingegebenen Namen zur Liste hinzu
      setNames([...names, name]);
    }
  };

  return (
    <div className="App">
      <h1>Tagesplanung</h1>
      <div className="box-container">
        <button className="addTable" onClick={handleAddNameClick}>+</button>
        {names.map((name, index) => (
          <p key={index}>{name}</p>
        ))}
        {boxes && boxes.map((box, index) => (
          <div key={index} className="aufgaben" style={{ backgroundColor: box.backgroundColor }}>
            <p>{box.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tagesplanung;
