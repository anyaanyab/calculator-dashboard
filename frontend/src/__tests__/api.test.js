// Tests using Jest framework - for testing API integration

// 'jsdom' environment used for simulating a browser-like environment

/**
 * @jest-environment jsdom
 */
import axios from 'axios';

// Mock axios for making HTTP requests
jest.mock('axios');

describe('API Integration Tests', () => {
  // Function for resetting mock implementations
  beforeEach(() => {
    axios.get.mockReset();
    axios.post.mockReset();
  });

  // Testing login functionality
  test('successfully logs in user', async () => {
    const loginData = {
      email: 'test@example.com',
      password: 'password123'
    };
    
    // Mocking a successful response from login API
    axios.post.mockResolvedValueOnce({ data: { token: 'test-token' } });
    
    const response = await axios.post('http://localhost:8000/api/auth/login', loginData);
    expect(response.data.token).toBe('test-token');
  });

  // Testing loading calculator configurations
  test('loads calculator configuration', async () => {
    const configData = [
      { id: '1', type: 'Basic Calculator', state: {} },
      { id: '2', type: 'Currency Exchange', state: {} }
    ];
    
    // Mocking response that contains array of configuration objects
    axios.get.mockResolvedValueOnce({ data: configData });
    
    const response = await axios.get('http://localhost:8000/api/dashboard/load-config');
    expect(response.data).toHaveLength(2);
    expect(response.data[0].type).toBe('Basic Calculator');
  });

  // Testing fetching exchange rates
  test('fetches exchange rates', async () => {
    const mockRates = {
      conversion_rates: {
        USD: 1,
        EUR: 0.85,
        GBP: 0.73
      }
    };
    
    // Verification that response contains properties for USD and EUR defined above
    axios.get.mockResolvedValueOnce({ data: mockRates });
    const response = await axios.get('http://localhost:8000/api/exchange-rates');
    expect(response.data.conversion_rates).toHaveProperty('USD');
    expect(response.data.conversion_rates).toHaveProperty('EUR');
  });
});