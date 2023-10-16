import React, { useState, useEffect } from 'react';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Laden Sie die Benutzerdaten aus dem JSON-Server
    fetch('http://localhost:3001/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Fehler beim Laden der Benutzerdaten: ', error));
  }, []);
  

  const handleLogin = () => {
    // Überprüfen, ob die eingegebenen Daten in einem der Benutzerobjekte im Array übereinstimmen
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
      console.log('Erfolgreich eingeloggt!'); // Erfolgreiche Anmeldung in der Konsole anzeigen
      setLoggedIn(true);
    } else {
      setErrorMessage('Ungültige Anmeldeinformationen. Bitte versuchen Sie es erneut.');
    }
  }

  return (
    <div>
      <h1>Login</h1>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
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
