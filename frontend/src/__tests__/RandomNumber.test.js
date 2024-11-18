// Tests for RandomNumberCalculator

import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RandomNumberCalculator from '../RandomNumber';

describe('RandomNumberCalculator Component', () => {
  // Mock function using Jest to track calls to 'onStateChange' prop
  const mockOnStateChange = jest.fn();
  // Default properties passed
  const defaultProps = {
    id: '1',
    savedState: {
      min: '1',
      max: '100',
      result: '',
      note: '',
      generatedNumbers: []
    },
    onStateChange: mockOnStateChange
  };

  // Previous mock calls cleared before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Check if component renders correctly with initial state
  test('renders with initial state', () => {
    render(<RandomNumberCalculator {...defaultProps} />);
    // Minimum and maximum input fields and button present
    expect(screen.getByLabelText('Min:')).toBeInTheDocument();
    expect(screen.getByLabelText('Max:')).toBeInTheDocument();
    expect(screen.getByTestId('generate-button')).toBeInTheDocument();
  });

  // Check handling generating a random number within range
  test('generates random number within range', async () => {
    render(<RandomNumberCalculator {...defaultProps} />);
    const minInput = screen.getByLabelText('Min:');
    const maxInput = screen.getByLabelText('Max:');
    // Simulate inputting values
    await userEvent.type(minInput, '1');
    await userEvent.type(maxInput, '10');
    // Simulate button click
    fireEvent.click(screen.getByTestId('generate-button'));
  });

  // Check if note input field works correctly
  test('handles note input correctly', async () => {
    render(<RandomNumberCalculator {...defaultProps} />);
    
    // Note typing simulated
    const noteInput = screen.getByPlaceholderText('Add a note...');
    await userEvent.type(noteInput, 'Random number note');

    // Verify that mock function called with expected note value
    expect(mockOnStateChange).toHaveBeenCalledWith(
      expect.objectContaining({ note: 'Random number note' })
    );
  });

});