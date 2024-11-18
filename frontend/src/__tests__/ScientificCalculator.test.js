// Tests for ScientificCalculator

import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ScientificCalculator from '../ScientificCalculator';

describe('ScientificCalculator Component', () => {
  // Mock function using Jest to track calls to 'onStateChange' prop
  const mockOnStateChange = jest.fn();
  // Default properties passed
  const defaultProps = {
    id: '1',
    savedState: {
      display: '0',
      equation: '',
      note: '',
      memory: '0'
    },
    onStateChange: mockOnStateChange
  };

  // Previous mock calls cleared before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Check that calculator renders correctly with an initial state
  test('renders with initial state', () => {
    render(<ScientificCalculator {...defaultProps} />);
    // Verify that display shows 0 and that buttons present
    expect(screen.getByTestId('calculator-display')).toHaveTextContent('0');
    expect(screen.getByText('sin')).toBeInTheDocument();
    expect(screen.getByText('cos')).toBeInTheDocument();
    expect(screen.getByText('tan')).toBeInTheDocument();
  });

  // Check that trigonometric calculations are performed correctly
  test('performs trigonometric calculations correctly', () => {
    render(<ScientificCalculator {...defaultProps} />);
    
    // Button clicking simulation for entering 90 degrees and pressing 'sin'
    fireEvent.click(screen.getByText('9'));
    fireEvent.click(screen.getByText('0'));
    fireEvent.click(screen.getByText('sin'));

    // Expected result is 1
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  // Check that calculator correctly computes square root
  test('calculates square root correctly', () => {
    render(<ScientificCalculator {...defaultProps} />);
    
    // Input - 16, button for square root pressed
    fireEvent.click(screen.getByText('1'));
    fireEvent.click(screen.getByText('6'));
    fireEvent.click(screen.getByText('√'));

    // Expected result is 4
    expect(screen.getByTestId('calculator-display')).toHaveTextContent('4');
  });

  // Check that calculator correctly handles exponential calculations
  test('handles exponential operations', () => {
    render(<ScientificCalculator {...defaultProps} />);
    
    // Input - 2, exponential pressed
    fireEvent.click(screen.getByText('2'));
    fireEvent.click(screen.getByText('x²'));

    // Expected result is 4
    expect(screen.getByTestId('calculator-display')).toHaveTextContent('4');
  });

  // Check that note input is handled correctly
  test('handles note input correctly', async () => {
    render(<ScientificCalculator {...defaultProps} />);
    
    // Simulate entering note
    const noteInput = screen.getByPlaceholderText('Add a note...');
    await userEvent.type(noteInput, 'Scientific calculation note');

    // Check calling 'mockOnStateChange' function with correct note
    expect(mockOnStateChange).toHaveBeenCalledWith(
      expect.objectContaining({ note: 'Scientific calculation note' })
    );
  });
});