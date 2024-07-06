// src/components/Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get('http://localhost:3000/users');
      const users = response.data;

      const user = users.find(
        (user) => user.Username === username && user.Password === password
      );

      if (user) {
        alert(`Welcome, ${user.FullName}!`);
        setErrorMessage('');
        navigate('/movies'); // Navigate to /movies on successful login
      } else {
        setErrorMessage('Invalid username or password.');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setErrorMessage('An error occurred while trying to log in.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login; // Ensure this line exports the component as default
