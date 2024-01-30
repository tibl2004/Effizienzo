import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'; // Importiere Link für die Navigation
import './Users.scss';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [editedUser, setEditedUser] = useState(null);

    useEffect(() => {
        fetchData(); // Initialer Abruf beim Laden der Komponente
        const intervalId = setInterval(fetchData, 10); // Alle 1000 Millisekunden aktualisieren

        return () => clearInterval(intervalId); // Aufräumen beim Komponentenabbau
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:4000/users');

            // Überprüfe, ob response.data ein Array mit mindestens einem Element ist
            if (response.data && Array.isArray(response.data) && response.data.length > 0) {
                setUsers(response.data);
            } else {
                console.error('Invalid data structure returned by the API:', response.data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const copyUserData = (user) => {
        const userData = `https://effizienzo.vercel.app\nBenutzername: ${user.username}\nPasswort: ${user.password}`;
        navigator.clipboard.writeText(userData);
    };

    const handleDeleteUser = async (userId) => {
        const isConfirmed = window.confirm('Bist du sicher, dass du diesen Benutzer löschen möchtest?');

        if (isConfirmed) {
            try {
                await axios.delete(`http://localhost:4000/users/${userId}`);
                console.log('Benutzer erfolgreich gelöscht:', userId);

                setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
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

            setUsers(prevUsers => prevUsers.map(user =>
                user.id === editedUser.id ? response.data : user
            ));
            setEditedUser(null);
        } catch (error) {
            console.error('Fehler beim Aktualisieren des Benutzers:', error);
        }
    };

    return (
        <div>
            <h1>Benutzer</h1>
            <button>
          <Link to="/admins/usercreate" className="addnewUser">
            +
          </Link>
        </button>
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
                                <input
                                    type="checkbox"
                                    checked={editedUser.isAdmin}
                                    onChange={(e) => setEditedUser({ ...editedUser, isAdmin: e.target.checked })}
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
                                <p>Rolle: {user.isAdmin ? 'Admin' : 'User'}</p>
                
                                <button className='delete' onClick={() => handleDeleteUser(user.id)}>
                                    <FontAwesomeIcon icon={faTrash} /> Löschen
                                </button>
                                <button className='edit' onClick={() => handleEditUser(user)}>
                                    Bearbeiten
                                </button>
                                <button className='copy' onClick={() => copyUserData(user)}>
                                    Daten kopieren
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
