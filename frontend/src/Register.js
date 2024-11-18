// User Registration

import React, { useState } from 'react';
import axios from 'axios';
import './Auth.css';

const Register = ({ setAuth }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');

  // Triggered when registration form is submitted
  const handleRegister = async (e) => {
    // Stops form from submitting in traditional way - refreshing page
    e.preventDefault();
    // Status updated
    setStatus('Registering...');
    // Email being used is logged to the console
    console.log('Attempting registration with:', email);
    
    // POST request to registration endpoint sent
    try {
      const response = await axios.post('http://localhost:8000/api/auth/register', {
        email,
        password
      });
      // If registration successful, logs response data, stores token, updates authentication state, sets status 
      console.log('Registration response:', response.data);
      localStorage.setItem('token', response.data.token);
      setAuth(true);
      setStatus('Success!');
    } catch (error) {
      console.log('Registration error:', error);
      setStatus('Registration failed');
    }
  };

  // JSX structure returned
  // Two input fields, submit button included
  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleRegister}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Register</button>
        {status && <div className="status-message">{status}</div>}
      </form>
    </div>
  );
};

export default Register;