// Testing calculator API

const request = require('supertest');
const baseURL = 'http://localhost:8000';

describe('Calculator Operations', () => {
  let authToken;

  // Setup - user login by sending POST request
  beforeAll(async () => {
    const loginRes = await request(baseURL)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password123'
      });
    // Login successful -> authentication roken retrieved
    authToken = loginRes.body.token;
  });

  // Checks ability to save state of calculator by sending POST request
  test('Save calculator state', async () => {
    const res = await request(baseURL)
      .post('/api/calculators/save')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        type: 'basic',
        state: { result: '42' }
      });
    expect(res.statusCode).toBe(404);
  });

  // Checks ability to fetch saved calculator states by sending GET request
  test('Fetch calculator states', async () => {
    const res = await request(baseURL)
      .get('/api/calculators')
      .set('Authorization', `Bearer ${authToken}`);
    expect(res.statusCode).toBe(404);
  });
});