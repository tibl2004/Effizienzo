import React, { useState } from "react";
import axios from "axios";

function CreateAdmin() {
  const [newAdmin, setNewAdmin] = useState({
    vorname: "",
    nachname: "",
    username: "",
    password: "",
    enddatum: "",
    isAdmin: false, // Neues Feld für die Admin-Rolle
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    // Falls es sich um eine Checkbox handelt, setze den Wert auf checked, sonst auf value
    const inputValue = type === "checkbox" ? checked : value;

    setNewAdmin({ ...newAdmin, [name]: inputValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Konvertiere das Enddatum in ISO 8601-Format
    const isoEnddatum = newAdmin.enddatum;
    newAdmin.enddatum = isoEnddatum;

    // Hier sollten Sie die POST-Anfrage senden, um einen neuen Admin hinzuzufügen
    // Setzen Sie das loggedIn-Feld auf true
    axios
      .post("https://users-8a52.onrender.com/users", newAdmin)
      .then((response) => {
        // Hier können Sie je nach Bedarf eine Bestätigung anzeigen
        console.log("Neuer Admin wurde erstellt.");

        // Zurück zur /admins-Seite navigieren
        window.location = "/admins";
      })
      .catch((error) => {
        console.error("Fehler beim Erstellen des neuen Admins: " + error);
      });
  };

  return (
    <div>
      <h2>Neuen Admin erstellen:</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="vorname"
          placeholder="Vorname"
          value={newAdmin.vorname}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="nachname"
          placeholder="Name"
          value={newAdmin.nachname}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="username"
          placeholder="Benutzername"
          value={newAdmin.username}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Passwort"
          value={newAdmin.password}
          onChange={handleInputChange}
        />
        <input
          type="date"
          name="enddatum"
          placeholder="Enddatum (YYYY-MM-DD)"
          value={newAdmin.enddatum}
          onChange={handleInputChange}
        />
        <label>
          Admin-Rolle:
          <input
            type="checkbox"
            name="isAdmin"
            checked={newAdmin.isAdmin}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Admin erstellen</button>
      </form>
    </div>
  );
}

export default CreateAdmin;
