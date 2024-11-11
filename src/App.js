import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // פונקציה שמבצעת התחברות ומקבלת את ה-JWT
  const handleLogin = () => {
    axios.post('http://localhost:8080/login', { username, password })
      .then(response => {
        const { accessToken, refreshToken } = response.data;
        sessionStorage.setItem("accessToken", accessToken);
        sessionStorage.setItem("refreshToken", refreshToken);
        console.log("Login successful. Access Token:", accessToken);
        setErrorMessage(''); // איפוס הודעת השגיאה במקרה של התחברות מוצלחת
      })
      .catch(error => {
        console.error("Login failed:", error);
        setErrorMessage("Login failed. Please check your credentials.");
      });
  };

  return (
    <div className="App">
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
}

export default App;
