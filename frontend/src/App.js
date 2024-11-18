// Main application structure

import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import './App.css';

function App() {
  const [calculators, setCalculators] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Hook for token verification
  useEffect(() => {
    const token = localStorage.getItem('token');
    // If token is found, attempt to verify token by making GET request to API endpoint
    if (token) {
      const verifyToken = async () => {
        try {
          const response = await axios.get('http://localhost:8000/api/auth/verify', {
            headers: { 
              'x-auth-token': token,
              'Content-Type': 'application/json'
            },
            timeout: 5000 // Add timeout
          });
          // If token is valid, isAuthenticated set to true, loadConfig() is called
          if (response.data) {
            setIsAuthenticated(true);
            loadConfig();
          }
          // If token verification fails, errors logged, token removed, user not authenticated
        } catch (error) {
          console.log('Token verification failed:', error.message);
          localStorage.removeItem('token');
          setIsAuthenticated(false);
        }
      };
      verifyToken();
    }
  }, []);  

  // Defined using 'useCallback' to memoize function
  const saveConfig = useCallback(async (calculators) => {
    const token = localStorage.getItem('token');
    // POST request sent to save configuration to server
    try {
      await fetch('http://localhost:8000/api/dashboard/save-config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
        body: JSON.stringify({ calculators }),
      });
    } catch (error) {
      console.error('Error saving configuration:', error);
    }
  }, []);
  
  // Hook for saving configuration
  useEffect(() => {
    // If array as any items, calls 'saveConfig' function
    if (calculators.length > 0) {
      saveConfig(calculators);
    }
  }, [calculators, saveConfig]);  

  // Retrieved configuration from backend API when called
  const loadConfig = async () => {
    const token = localStorage.getItem('token');
    // 'fetch' API used to make GET request 
    const response = await fetch('http://localhost:8000/api/dashboard/load-config', {
      headers: { 'x-auth-token': token }
    });
    // Expected response - JSON object
    const config = await response.json();
    // Mapped to initialize 'calculators' state with each calculator with 'state' property
    setCalculators(config.map(calc => ({ ...calc, state: calc.state || {} }))); // Load state
  };

  // Defined to create new calculator object with unique ID and type
  const addCalculator = (calculatorType) => {
    const newCalculator = {
      id: Date.now().toString(),
      type: calculatorType,
      // Initializes notes and state properties
      notes: '',
      state: {},
    };
    // 'calculators' state is updated
    setCalculators(prevCalculators => [...prevCalculators, newCalculator]);
  };

  // Routing structure defined
  // Routes for login and registration pages, which redirect to main application route if user authenticated
  // Main route renders layout containing 'Sidebar' and 'Dashboard'; they receive 'calculator' state
  return (
    <Router>
      <Routes>
        <Route path="/login" element={!isAuthenticated ? <Login setAuth={setIsAuthenticated} /> : <Navigate to="/" />} />
        <Route path="/register" element={!isAuthenticated ? <Register setAuth={setIsAuthenticated} /> : <Navigate to="/" />} />
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <div className="app">
                <Sidebar 
                  onAddCalculator={addCalculator} 
                  setIsAuthenticated={setIsAuthenticated}
                  calculators={calculators}
                />
                <Dashboard 
                  calculators={calculators}
                  setCalculators={setCalculators}
                />
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;