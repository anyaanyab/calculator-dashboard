// Tests for TimeZoneCalculator

import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TimeZoneCalculator from '../TimeZoneCalculator';

describe('TimeZoneCalculator Component', () => {
  // Mock function using Jest to track calls to 'onStateChange' prop
  const mockOnStateChange = jest.fn();
  // Default properties passed
  const defaultProps = {
    id: '1',
    savedState: {
      sourceTime: '',
      sourceZone: 'UTC',
      targetZone: 'America/New_York',
      result: '',
      note: ''
    },
    onStateChange: mockOnStateChange
  };

  // Previous mock calls cleared before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Check if component renders correctly with initial state
  test('renders with initial state', () => {
    render(<TimeZoneCalculator {...defaultProps} />);
    // Verify that there are two dropdowns for selecting time zones, button is present

    const selects = screen.getAllByRole('combobox');
    const convertButton = screen.getByRole('button', { name: /convert time/i });
    
    expect(selects).toHaveLength(2);
    expect(convertButton).toBeInTheDocument();
  });
  
  // Check that component can convert time between time zones
  test('converts time between zones', () => {
    render(<TimeZoneCalculator {...defaultProps} />);
    // User input simulated

    const selects = screen.getAllByRole('combobox');
    const timeInput = screen.getByRole('textbox', { type: 'time' });
    
    fireEvent.change(timeInput, { target: { value: '14:00' } });
    fireEvent.change(selects[0], { target: { value: 'UTC' } });
    fireEvent.change(selects[1], { target: { value: 'America/New_York' } });
    
    // Check if element with 'data-testid' of 'timezone-result' is present -> conversion result displayed
    expect(screen.getByTestId('timezone-result')).toBeInTheDocument();
  }); 

  // Check that state is changed wen time input is changed
  test('updates state when time input changes', async () => {
    // Verify that state update function is called with correct parameters
    const mockOnStateChange = jest.fn();
    render(<TimeZoneCalculator onStateChange={mockOnStateChange} />);
    
    // Simulate clearing input and entering new time
    const timeInput = screen.getByLabelText('Time:');
    await userEvent.clear(timeInput);
    await userEvent.type(timeInput, '15:30');
  
    // Check that 'mockOnStateChange' called with object containing new time
    expect(mockOnStateChange).toHaveBeenLastCalledWith(
      expect.objectContaining({ time: '15:30' })
    );
  });
  
  // Check if changing target time zone dropdown updated state correctly
  test('handles timezone selection changes', () => {
    const mockOnStateChange = jest.fn();
    render(<TimeZoneCalculator onStateChange={mockOnStateChange} />);
    
    // Simulate selecting 'Europe/London'
    const targetZoneSelect = screen.getAllByRole('combobox')[1];
    fireEvent.change(targetZoneSelect, { target: { value: 'Europe/London' } });
  
    // Check that 'mockOnStateChange' called with expected value for toZone
    expect(mockOnStateChange).toHaveBeenCalledWith(
      expect.objectContaining({ toZone: 'Europe/London' })
    );
  });
  
  // Check if note input is handled correctly
  test('handles note input correctly', async () => {
    render(<TimeZoneCalculator {...defaultProps} />);
    
    // Simulate typing note
    const noteInput = screen.getByPlaceholderText('Add a note...');
    await userEvent.type(noteInput, 'Time zone conversion note');

    // Check that 'mockOnStateChange' called with note value
    expect(mockOnStateChange).toHaveBeenCalledWith(
      expect.objectContaining({ note: 'Time zone conversion note' })
    );
  });

});