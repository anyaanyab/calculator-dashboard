// Testing the login functionality of an API

// Library for testing HTTP servers
const request = require('supertest');
const baseURL = 'http://localhost:8000';

// Test suite for authentication
describe('Authentication', () => {
  // Check whether login fails when invalid credentials are provided
  test('Login fails with invalid credentials', async () => {
    const res = await request(baseURL)
    // Sends POST request to endpoint with incorrect credentials
      .post('/api/auth/login')
      .send({
        email: 'wrong@example.com',
        password: 'wrongpass'
      });
      // Bad response expected
    expect(res.statusCode).toBe(400);
  });
});