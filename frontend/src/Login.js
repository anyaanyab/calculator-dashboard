// Login form for user authentication

import React, { useState } from 'react';
import axios from 'axios';
import './Auth.css';

const Login = ({ setAuth }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');

  // Handles login process when form is submitted
  const handleLogin = async (e) => {
    // Default form submission behavior prevented
    e.preventDefault();
    // Status message updated
    setStatus('Logging in...');
    // Email being used for login attempt logged to the console
    console.log('Attempting login with:', email);
    
    // HTTP POST request made
    try {
      const response = await axios.post('http://localhost:8000/api/auth/login', {
        email,
        password
      });
      // If login successful, response logged to console, token received stored 
      console.log('Login response:', response.data);
      localStorage.setItem('token', response.data.token);
      // Authentication state updated, status message updated
      setAuth(true);
      setStatus('Success!');
      // Error details logged to console
    } catch (error) {
      console.log('Login error details:', error.response?.data);
      setStatus(error.response?.data?.message || 'Login failed');
    }
  };  

  // JSX structure returned representing login form
  // 'onSubmit' handler triggers 'handleLogin'
  // Two input fields, submit button, status message, register link provided
  return (
    <div className="auth-container">
      <form className="auth-form" data-testid="login-form" onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
        {status && <div className="status-message">{status}</div>}
        <div className="register-link">
          <p>New user? <a href="/register">Register here</a></p>
        </div>
      </form>
    </div>
  );
}  

export default Login;