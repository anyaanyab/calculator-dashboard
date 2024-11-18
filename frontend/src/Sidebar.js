// Sidebar

import React from 'react';

// Function with three props and 'calculatorTypes' array with strings representing calculators
const Sidebar = ({ onAddCalculator, setIsAuthenticated, calculators }) => {
  const calculatorTypes = [
    'Basic Calculator',
    'Currency Exchange',
    'Scientific Calculator',
    'Time Zone Calculator',
    'Percentage Calculator',
    'Random Number Generator'
  ];

  // Handles logout process
  const handleLogout = async () => {
    // Token retrieved from 'localStorage'
    const token = localStorage.getItem('token');
    // POST request sent to save current state of calculators before logging out
    await fetch('http://localhost:8000/api/dashboard/save-config', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
      body: JSON.stringify({ calculators }),
    });
    // After request completion, removes token and updates authentication state
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  // JSX structure returned
  // Includes heading, list of buttons and footer with logout button and copyright notice
  return (
    <div className="sidebar">
      <h2>Choose a Calculator!</h2>
      {calculatorTypes.map(type => (
        <button
          key={type}
          onClick={() => onAddCalculator(type)}
          className="calculator-button"
        >
          Add {type}
        </button>
      ))}
      <div className="sidebar-footer">
        <button className="logout-button" data-testid="logout-button" onClick={handleLogout}>
          Logout
        </button>
        <p>2024, Calculator Dashboard by Anna Boehme</p>
      </div>
    </div>
  );
};

export default Sidebar;