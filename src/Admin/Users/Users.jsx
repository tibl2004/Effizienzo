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
                const response = await axios.get('http://localhost:4000/users');
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
                const response = await axios.delete(`http://localhost:4000/users/${userId}`);
                console.log('Benutzer erfolgreich gelöscht:', response.data);

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
        try {
            const response = await axios.put(`http://localhost:4000/users/${editedUser.id}`, editedUser);
            console.log('Benutzer erfolgreich aktualisiert:', response.data);

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
                            <>
                                <input
                                    type="text"
                                    value={editedUser.vorname}
                                    onChange={(e) => setEditedUser({ ...editedUser, vorname: e.target.value })}
                                />
                                <input
                                    type="text"
                                    value={editedUser.nachname}
                                    onChange={(e) => setEditedUser({ ...editedUser, nachname: e.target.value })}
                                />
                                <input
                                    type="text"
                                    value={editedUser.username}
                                    onChange={(e) => setEditedUser({ ...editedUser, username: e.target.value })}
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
                            <>
                                <p>Vorname: {user.vorname}</p>
                                <p>Nachname: {user.nachname}</p>
                                <p>Benutzername: {user.username}</p>
                                <p>Passwort: {user.password}</p>
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
