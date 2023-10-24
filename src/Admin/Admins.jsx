import React, { useState, useEffect } from "react";
import axios from "axios";

function Admins() {
    const [admins, setAdmins] = useState([]);
    const [newAdmin, setNewAdmin] = useState({ username: "", password: "" });
    const [editMode, setEditMode] = useState(null); // Hier speichern wir die ID des Admins im Bearbeitungsmodus

    useEffect(() => {
        // Hier sollte der Code stehen, um die Admin-Daten vom Server abzurufen
        // Ändern Sie die URL entsprechend Ihrer Anforderungen
        axios.get("https://users-8a52.onrender.com/users")
            .then(response => {
                // Wenn die Daten erfolgreich abgerufen wurden, setzen Sie den State
                setAdmins(response.data);
            })
            .catch(error => {
                console.error("Fehler beim Abrufen der Daten: " + error);
            });
    }, []);

    const handleInputChange = (e, adminId) => {
        const { name, value } = e.target;
        const updatedAdmins = admins.map(admin => {
            if (admin.id === adminId) {
                return { ...admin, [name]: value };
            }
            return admin;
        });
        setAdmins(updatedAdmins);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Hier sollten Sie die POST-Anfrage senden, um einen neuen Admin hinzuzufügen
        // Ändern Sie die URL und die Daten entsprechend Ihrer Anforderungen
        axios.post("https://users-8a52.onrender.com/users", newAdmin)
            .then(response => {
                // Nach erfolgreicher Erstellung können Sie die Admins erneut abrufen
                axios.get("https://users-8a52.onrender.com/users")
                    .then(response => {
                        setAdmins(response.data);
                    })
                    .catch(error => {
                        console.error("Fehler beim Abrufen der Daten: " + error);
                    });
            })
            .catch(error => {
                console.error("Fehler beim Erstellen des neuen Admins: " + error);
            });
    };

    const handleDeleteAdmin = (adminId) => {
        // Hier sollten Sie die DELETE-Anfrage senden, um den Admin zu löschen
        // Ändern Sie die URL entsprechend Ihrer Anforderungen
        axios.delete(`https://users-8a52.onrender.com/users/${adminId}`)
            .then(response => {
                // Nach erfolgreicher Löschung können Sie die Admins erneut abrufen
                axios.get("https://users-8a52.onrender.com/users")
                    .then (response => {
                        setAdmins(response.data);
                    })
                    .catch(error => {
                        console.error("Fehler beim Abrufen der Daten: " + error);
                    });
            })
            .catch(error => {
                console.error("Fehler beim Löschen des Admins: " + error);
            });
    };

    const handleEditAdmin = (adminId) => {
        setEditMode(adminId); // Aktivieren Sie den Bearbeitungsmodus für diesen Admin
    };

    const handleSaveAdmin = (adminId) => {
        // Hier sollten Sie die PUT- oder PATCH-Anfrage senden, um die Änderungen zu speichern
        // Ändern Sie die URL und die Daten entsprechend Ihrer Anforderungen
        const editedAdmin = admins.find(admin => admin.id === adminId);
        axios.put(`https://users-8a52.onrender.com/users/${adminId}`, editedAdmin)
            .then(response => {
                // Nach erfolgreicher Aktualisierung können Sie den Bearbeitungsmodus beenden
                setEditMode(null);
            })
            .catch(error => {
                console.error("Fehler beim Speichern der Änderungen: " + error);
            });
    };

    return (
        <div className="App">
            <h1>Admins:</h1>
            <div className="admin-boxes">
                {admins.map(admin => (
                    <div className="admin-box" key={admin.id}>
                        {admin.id === editMode ? (
                            <div>
                                <input
                                    type="text"
                                    name="username"
                                    value={admin.username}
                                    onChange={(e) => handleInputChange(e, admin.id)}
                                />
                                <input
                                    type="text"
                                    name="password"
                                    value={admin.password}
                                    onChange={(e) => handleInputChange(e, admin.id)}
                                />
                                <button onClick={() => handleSaveAdmin(admin.id)}>Speichern</button>
                            </div>
                        ) : (
                            <div>
                                {admin.username}
                                <button onClick={() => handleEditAdmin(admin.id)}>Bearbeiten</button>
                                <button onClick={() => handleDeleteAdmin(admin.id)}>Löschen</button>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <h2>Neuen Admin erstellen:</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Benutzername"
                    value={newAdmin.username}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="password"
                    placeholder="Passwort"
                    value={newAdmin.password}
                    onChange={handleInputChange}
                />
                <button type="submit">Admin erstellen</button>
            </form>
        </div>
    );
}

export default Admins;
