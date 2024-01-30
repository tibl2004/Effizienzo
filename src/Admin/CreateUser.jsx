import React, { useState } from "react";
import axios from "axios";

function CreateUser() {
  const [newUser, setNewUser] = useState({
    vorname: "",
    nachname: "",
    username: "",
    password: "",
    isAdmin: false,
    loggedIn: false,
  });
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;

    setNewUser({ ...newUser, [name]: inputValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/users",
        newUser,
        { withCredentials: true }
      );
      console.log("Neuer Benutzer wurde erstellt.");

      // Umleiten zur Benutzerliste
      window.location = "/admins/users";
    } catch (error) {
      console.error("Fehler beim Erstellen des neuen Benutzers: ", error);
      setError("Fehler beim Erstellen des neuen Benutzers.");
    }
  };

  return (
    <div>
      <h2>Neuen Benutzer erstellen:</h2>
      {error && <p>{error}</p>}
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
          placeholder="Nachname"
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
        <label>
          Admin:
          <input
            type="checkbox"
            name="isAdmin"
            checked={newUser.isAdmin}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Benutzer erstellen</button>
      </form>
    </div>
  );
}

export default CreateUser;
