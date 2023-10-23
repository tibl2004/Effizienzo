import React, { useState, useEffect } from 'react';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [userFirstName, setUserFirstName] = useState(''); // Zustand für den Vornamen des Benutzers
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Laden Sie die Benutzerdaten aus dem angegebenen Server
    const apiUrl = 'https://users-8a52.onrender.com/users';

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        if (data && data.length > 0) {
          // Setzen Sie die Benutzerdaten im State
          setUsers(data);
        } else {
          console.error('Fehler beim Laden der Benutzerdaten.');
        }
      })
      .catch(error => console.error('Fehler beim Laden der Benutzerdaten: ', error));
  }, []);

  const [users, setUsers] = useState([]); // Benutzerdaten im State speichern

  const handleLogin = () => {
    // Überprüfen, ob die eingegebenen Daten in einem der Benutzerobjekte im Array übereinstimmen
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
      setUserFirstName(user.firstName); // Den Vornamen des Benutzers setzen
      setLoggedIn(true);
      setErrorMessage(''); // Zurücksetzen der Fehlermeldung
    } else {
      setErrorMessage('Ungültige Anmeldeinformationen. Bitte versuchen Sie es erneut.');
    }
  }

  return (
    <div>
      <h1>Login</h1>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {loggedIn && (
        <div>
          <p style={{ color: 'green' }}>Login korrekt!</p>
          <p>Hallo, {username}! Das Login war erfolgreich, aber die Webseite ist noch nicht bereit, um Ihren Account zu verwalten.</p>
        </div>
      )}
      <input
        type="text"
        placeholder="Benutzername"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Passwort"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
