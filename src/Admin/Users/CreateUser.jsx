import React, { useState } from "react";
import axios from "axios";

function CreateUser() {
  const [newUser, setNewUser] = useState({
    vorname: "",
    nachname: "",
    username: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:4000/users", newUser);
      console.log("Benutzer erstellt:", response.data);
      
      // Hier leitest du nach der erfolgreichen Erstellung weiter
      window.location = "/admins/users";
    } catch (error) {
      console.error("Fehler beim Erstellen des Benutzers:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewUser({
      ...newUser,
      [name]: value,
    });
  };

  return (
    <div>
      <h2>Neuen User erstellen:</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="vorname"
          placeholder="Vorname"
          value={newUser.vorname}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="nachname"
          placeholder="Name"
          value={newUser.nachname}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="username"
          placeholder="Benutzername"
          value={newUser.username}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Passwort"
          value={newUser.password}
          onChange={handleInputChange}
        />

        <button type="submit">Benutzer erstellen</button>
      </form>
    </div>
  );
}

export default CreateUser;
