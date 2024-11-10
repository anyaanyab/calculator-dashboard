// Tests for CurrencyExchange

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import CurrencyExchange from '../CurrencyExchange';

// 'axios' mocked 
jest.mock('axios');

describe('CurrencyExchange Component', () => {
  // Simulation of data structure returned by API call
  const mockRates = {
    conversion_rates: {
      USD: 1,
      EUR: 0.85,
      GBP: 0.73,
      JPY: 110.25
    }
  };

  const mockOnStateChange = jest.fn();
  // Default properties passed to 'CurrencyExchange'
  const defaultProps = {
    id: '1',
    savedState: {
      amount: '1',
      fromCurrency: 'USD',
      toCurrency: 'EUR',
      result: '',
      note: ''
    },
    onStateChange: mockOnStateChange
  };

  // Previous mock calls cleared before each test
  beforeEach(() => {
    jest.clearAllMocks();
    axios.get.mockResolvedValue({ data: mockRates });
  });

  // Check if 'CurrencyExchange' renders correctly with initial state
  test('renders with initial state', async () => {
    render(<CurrencyExchange {...defaultProps} />);
    
    // Verification that input fields display correct default values
    await waitFor(() => {
      expect(screen.getByDisplayValue('1')).toBeInTheDocument();
      expect(screen.getByDisplayValue('USD')).toBeInTheDocument();
      expect(screen.getByDisplayValue('EUR')).toBeInTheDocument();
    });
  });

  // Check if component makes correct API call to fetch exchange rates when it mounts
  test('fetches exchange rates on mount', async () => {
    render(<CurrencyExchange {...defaultProps} />);
    
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith('http://localhost:8000/api/exchange-rates');
    });
  });

  // Check if currency conversion is performed correctly
  test('performs currency conversion correctly', async () => {
    // Mock onStateChange function
    const mockOnStateChange = jest.fn();
    
    render(<CurrencyExchange onStateChange={mockOnStateChange} />);
    
    // Input field for amount and convert button retrieved 
    const amountInput = screen.getByRole('spinbutton');
    const convertButton = screen.getByRole('button', { name: /convert/i });
    
    // Clear input field to ensure clean state
    await userEvent.clear(amountInput);
    // Typing the value
    await userEvent.type(amountInput, '100');
    
    // Click convert button
    await userEvent.click(convertButton);
    
    // Wait for resut of conversion to appear on screen -> check for matching
    await waitFor(() => {
      expect(screen.getByTestId('result')).toHaveTextContent('100 USD = 85.00 EUR');
    }, { timeout: 3000, interval: 100 });
    
    // Verify input value stayed at 100
    expect(amountInput).toHaveValue(100);
  });
  
  // Check that state is updated upon amount changes
  test('updates state when amount changes', async () => {

    const mockOnStateChange = jest.fn();
    render(<CurrencyExchange onStateChange={mockOnStateChange} />);
    
    // Retrieve input element for amount
    const amountInput = screen.getByRole('spinbutton');
    
    // Clear input field
    await userEvent.clear(amountInput);
    // Typing new value
    await userEvent.type(amountInput, '100');
    
    // Wait for function calling and check for 100
    await waitFor(() => {
      expect(mockOnStateChange).toHaveBeenCalledWith(
        expect.objectContaining({ amount: '100' })
      );
    });
  });

  // Check correct handling of currency selection changes
  test('handles currency selection changes', async () => {
    render(<CurrencyExchange {...defaultProps} />);
    
    // Looking for currency selection dropdown with 'EUR'
    await waitFor(() => {
      const toCurrencySelect = screen.getByDisplayValue('EUR');
      // Simulate change event on dropdown to select 'GBP'
      fireEvent.change(toCurrencySelect, { target: { value: 'GBP' } });
    });

    expect(mockOnStateChange).toHaveBeenCalledWith(
      expect.objectContaining({ toCurrency: 'GBP' })
    );
  });

  // Check correcy handling of note input
  test('handles note input correctly', async () => {
    render(<CurrencyExchange {...defaultProps} />);
    
    // Finding an input element using Placeholder
    const noteInput = screen.getByPlaceholderText('Add a note...');
    // Note typing simulation
    await userEvent.type(noteInput, 'Currency conversion note');

    // Check if mockOnStateChange was called with object containing a note
    expect(mockOnStateChange).toHaveBeenCalledWith(
      expect.objectContaining({ note: 'Currency conversion note' })
    );
  });
});