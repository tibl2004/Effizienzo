import React, { useState } from "react";
import axios from "axios";

function CreateUser() {
  const [newAdmin, setNewAdmin] = useState({
    vorname: "",
    nachname: "",
    username: "",
    password: "",
    enddatum: "",
    isAdmin: false,
    loggedIn: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;

    setNewAdmin({ ...newAdmin, [name]: inputValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://nodejs-effizienzo-api.onrender.com/api/v1/users",
        newAdmin,
        { withCredentials: true }
      );
      console.log("Neuer Admin wurde erstellt.");

      
      window.location = "/admins/users";
    } catch (error) {
      console.error("Fehler beim Erstellen des neuen Admins: " + error);
    }
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
          value={newAdmin.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="username"
          placeholder="Benutzername"
          value={newAdmin.benutzername}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Passwort"
          value={newAdmin.passwort}
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
          Admin:
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

export default CreateUser;
