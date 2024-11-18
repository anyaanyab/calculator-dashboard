// Tests for PercentageCalculator

import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PercentageCalculator from '../PercentageCalculator';

describe('PercentageCalculator Component', () => {
  // Mock function using Jest to track calls to 'onStateChange' prop
  const mockOnStateChange = jest.fn();
  // Default properties passed
  const defaultProps = {
    id: '1',
    savedState: {
      value1: '',
      value2: '',
      result: '',
      calculationType: 'percentage',
      note: ''
    },
    onStateChange: mockOnStateChange
  };

  // Previous mock calls cleared before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Check if component calculates percentage correctly
  test('calculates percentage correctly', async () => {
    render(<PercentageCalculator {...defaultProps} />);
    
    // 50 typed into Amount, 200 into percentage
    const value1Input = screen.getByPlaceholderText('Amount');
    const value2Input = screen.getByPlaceholderText('Percentage');
    
    await userEvent.type(value1Input, '50');
    await userEvent.type(value2Input, '200');
    
    // Button clicked
    fireEvent.click(screen.getByText('Calculate'));

    // Expects 200% of 50 is 100.00
    expect(screen.getByText('200% of 50 is 100.00')).toBeInTheDocument();
  });

  // Check if note input field works as intended
  test('handles note input correctly', async () => {
    render(<PercentageCalculator {...defaultProps} />);
    
    // Note typed into field
    const noteInput = screen.getByPlaceholderText('Add a note...');
    await userEvent.type(noteInput, 'Percentage calculation note');

    // Expected to have the text entered in the note
    expect(mockOnStateChange).toHaveBeenCalledWith(
      expect.objectContaining({ note: 'Percentage calculation note' })
    );
  });

});