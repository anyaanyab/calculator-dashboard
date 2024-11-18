// Test suite for App

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';
import axios from 'axios';

// 'axios' module mocked
jest.mock('axios');

describe('App Component', () => {
  // Clears storage and previous mocks to avoid interference
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
    
    // Mock successful authentication response
    axios.get.mockImplementation((url) => {
      if (url.includes('/api/auth/check')) {
        return Promise.resolve({ 
          data: { 
            isAuthenticated: true,
            user: { email: 'test@example.com' }
          }
        });
      }
      return Promise.resolve({ data: {} });
    });

    // Mock successful login response
    axios.post.mockImplementation((url) => {
      if (url.includes('/api/auth/login')) {
        return Promise.resolve({ 
          data: { 
            token: 'test-token',
            user: { email: 'test@example.com' }
          }
        });
      }
      return Promise.resolve({ data: {} });
    });
  });

  // Check whether login form is rendered correctly
  test('renders login form initially', () => {
    render(<App />);
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
  });

  // Checks if successful login is handeled correctly
  test('handles successful login', async () => {
    render(<App />);
    
    // Simulation of user interaction for logging in
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password123' }
    });
    
    fireEvent.click(screen.getByText('Login'));
    
    // Check if "Choose a Calculator!" appears in document -> successful login
    await waitFor(() => {
      expect(screen.getByText('Choose a Calculator!')).toBeInTheDocument();
    });
  });
});