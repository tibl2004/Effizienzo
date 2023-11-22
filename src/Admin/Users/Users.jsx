import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import './Users.scss';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [editedUser, setEditedUser] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://users-8a52.onrender.com/users');
                console.log('Response data:', response.data);
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleDeleteUser = async (userId) => {
        const isConfirmed = window.confirm('Bist du sicher, dass du diesen Benutzer löschen möchtest?');

        if (isConfirmed) {
            try {
                // Hier wird die DELETE-Anfrage mit Axios durchgeführt
                const response = await axios.delete(`https://users-8a52.onrender.com/users/${userId}`);
                console.log('Benutzer erfolgreich gelöscht:', response.data);

                // Aktualisiere die Benutzerliste nach dem Löschen
                const updatedUsers = users.filter(user => user.id !== userId);
                setUsers(updatedUsers);
            } catch (error) {
                console.error('Fehler beim Löschen des Benutzers:', error);
            }
        } else {
            console.log('Löschen abgebrochen.');
        }
    };

    const handleEditUser = (user) => {
        setEditedUser(user);
    };

    const handleCancelEdit = () => {
        setEditedUser(null);
    };

    const handleSaveEdit = async () => {
        // Hier sollten die geänderten Informationen an die API gesendet werden
        try {
            const response = await axios.put(`https://users-8a52.onrender.com/users/${editedUser.id}`, editedUser);
            console.log('Benutzer erfolgreich aktualisiert:', response.data);

            // Aktualisiere die Benutzerliste nach dem Speichern
            const updatedUsers = users.map(user =>
                user.id === editedUser.id ? response.data : user
            );

            setUsers(updatedUsers);
            setEditedUser(null);
        } catch (error) {
            console.error('Fehler beim Aktualisieren des Benutzers:', error);
        }
    };

    return (
        <div>
            <h1>Benutzer</h1>
            <div className="users-container">
                {users.map(user => (
                    <div key={user.id} className="user-box">
                        <div className={`status-circle ${user.loggedIn ? 'online' : 'offline'}`} title={user.loggedIn ? 'Online' : 'Offline'}></div>
                        {editedUser && editedUser.id === user.id ? (
                            // Bearbeitungsmodus
                            <>
                                <input
                                    type="text"
                                    value={editedUser.vorname}
                                    onChange={(e) => setEditedUser({ ...editedUser, vorname: e.target.value })}
                                />
                                <input
                                    type="text"
                                    value={editedUser.name}
                                    onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                                />
                                <input
                                    type="text"
                                    value={editedUser.benutzername}
                                    onChange={(e) => setEditedUser({ ...editedUser, benutzername: e.target.value })}
                                />

                                <input
                                    type="password"
                                    value={editedUser.password}
                                    onChange={(e) => setEditedUser({ ...editedUser, password: e.target.value })}
                                /> 
                                <button onClick={handleSaveEdit}>Speichern</button>
                                <button onClick={handleCancelEdit}>Abbrechen</button>
                            </>
                        ) : (
                            // Anzeigemodus
                            <>
                                <p>Vorname: {user.vorname}</p>
                                <p>Name: {user.name}</p>
                                <p>Benutzername: {user.benutzername}</p>

                                <p>Passwort: {user.passwort}</p>
                                <button className='delete' onClick={() => handleDeleteUser(user.id)}>
                                    <FontAwesomeIcon icon={faTrash} /> Löschen
                                </button>
                                <button className='edit' onClick={() => handleEditUser(user)}>
                                    Bearbeiten
                                </button>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Users;
