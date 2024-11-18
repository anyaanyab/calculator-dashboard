// Tests for Dashboard

import { render, screen, fireEvent } from '@testing-library/react';
import Dashboard from '../Dashboard';

describe('Dashboard Component', () => {
  // Array of mock calculator objects that simulate state of calculators 
  const mockCalculators = [
    { 
      id: '1', 
      type: 'Basic Calculator', 
      state: { display: '0', note: '' } 
    },
    { 
      id: '2', 
      type: 'Currency Exchange', 
      state: { amount: '1', fromCurrency: 'USD', toCurrency: 'EUR' } 
    }
  ];

  // Jest mock function for simulating 'setCalculators'
  const mockSetCalculators = jest.fn();

  // State of all mocks reset before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Check if calculator widgets are correctly rendered
  test('renders all calculator widgets', () => {
    render(<Dashboard calculators={mockCalculators} setCalculators={mockSetCalculators} />);
    // Verify that text corresponding to each calculator type is present in document
    expect(screen.getByText('Basic Calculator')).toBeInTheDocument();
    expect(screen.getByText('Currency Exchange')).toBeInTheDocument();
  });

  // Check if calculator is removed upon clicking close button
  test('removes calculator when close button is clicked', async () => {
    render(<Dashboard calculators={mockCalculators} setCalculators={mockSetCalculators} />);
    
    // Close buttons found, first one clicked by fireEvent
    const closeButtons = screen.getAllByText('×');
    fireEvent.click(closeButtons[0]);

    // Check that function was called and verify that new state of calculator contains second calculator only
    expect(mockSetCalculators).toHaveBeenCalled();
    const newCalculators = mockSetCalculators.mock.calls[0][0](mockCalculators);
    expect(newCalculators).toHaveLength(1);
    expect(newCalculators[0].id).toBe('2');
  });

  // Check that layout of calculator remains same after re-rendering component
  test('maintains calculator layout after re-render', () => {
    // Initial layout captured, 'Dashboard' re-rendered

    const { rerender } = render(
      <Dashboard calculators={mockCalculators} setCalculators={mockSetCalculators} />
    );
    
    const initialLayout = screen.getAllByText(/Calculator/).map(el => el.textContent);
    
    rerender(<Dashboard calculators={mockCalculators} setCalculators={mockSetCalculators} />);
    
    const newLayout = screen.getAllByText(/Calculator/).map(el => el.textContent);

    // Layout compared
    expect(newLayout).toEqual(initialLayout);
  });
});