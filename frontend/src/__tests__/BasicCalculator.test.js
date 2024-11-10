// Tests for BasicCalculator

import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BasicCalculator from '../BasicCalculator';

describe('BasicCalculator Component', () => {
  // Mock function using Jest to track calls to 'onStateChange' prop
  const mockOnStateChange = jest.fn();
  // Default properties passed to 'BasicCalculator'
  const defaultProps = {
    id: '1',
    savedState: { display: '0', equation: '', note: '' },
    onStateChange: mockOnStateChange
  };

  // Mock functions are cleared to avoid interference
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Check if calculator renders correctly with initial state
  test('renders with initial state', () => {
    render(<BasicCalculator {...defaultProps} />);
    // Display should show 0, note input field is present
    expect(screen.getByTestId('calculator-display')).toHaveTextContent('0');
    expect(screen.getByPlaceholderText('Add a note...')).toBeInTheDocument();
  });  

  // Check if correct result is displayed after addition
  test('performs addition correctly', () => {
    render(<BasicCalculator {...defaultProps} />);
    const display = screen.getByTestId('calculator-display');
    
    // Simulation of clicking buttons to perform addition
    fireEvent.click(screen.getByRole('button', { name: '2' }));
    fireEvent.click(screen.getByRole('button', { name: '+' }));
    fireEvent.click(screen.getByRole('button', { name: '3' }));
    fireEvent.click(screen.getByRole('button', { name: '=' }));
    
    // Display should show 5
    expect(display).toHaveTextContent('5');
  });

  // Check if correct result is displayed after substraction
  test('performs subtraction correctly', () => {
    render(<BasicCalculator {...defaultProps} />);
    
    fireEvent.click(screen.getByText('5'));
    fireEvent.click(screen.getByText('-'));
    fireEvent.click(screen.getByText('3'));
    fireEvent.click(screen.getByText('='));

    expect(screen.getByTestId('calculator-display')).toHaveTextContent('2');
  });

  // Check if correct result is displayed after multiplication
  test('performs multiplication correctly', () => {
    render(<BasicCalculator {...defaultProps} />);
    
    fireEvent.click(screen.getByText('4'));
    fireEvent.click(screen.getByText('×'));
    fireEvent.click(screen.getByText('3'));
    fireEvent.click(screen.getByText('='));

    expect(screen.getByText('12')).toBeInTheDocument();
  });

  // Check if note input is handled correctly
  test('handles note input correctly', async () => {
    render(<BasicCalculator {...defaultProps} />);
    
    // Find input field with placeholder and simulate typing text
    const noteInput = screen.getByPlaceholderText('Add a note...');
    await userEvent.type(noteInput, 'Test calculation');

    // Assertion that mock function was called with object containing note
    expect(mockOnStateChange).toHaveBeenCalledWith(
      expect.objectContaining({ note: 'Test calculation' })
    );
  });

  // Check that clicking 'C' clears calculator display
  test('clears display when C button is clicked', () => {
    render(<BasicCalculator {...defaultProps} />);
    
    // '5' clicked, then 'C' clicked 
    fireEvent.click(screen.getByText('5'));
    fireEvent.click(screen.getByText('C'));

    // Display should show 0
    expect(screen.getByTestId('calculator-display')).toHaveTextContent('0');
  });

  // Check for maintaining state between renders
  test('maintains state between renders', () => {
    const { rerender } = render(<BasicCalculator {...defaultProps} />);
    
    fireEvent.click(screen.getByText('5'));
    
    rerender(<BasicCalculator {...defaultProps} />);
    expect(screen.getByTestId('calculator-display')).toHaveTextContent('5');
  });
});