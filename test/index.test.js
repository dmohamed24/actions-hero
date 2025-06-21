const request = require('supertest');
const { app, server } = require('../src/index');
const fetch = require('node-fetch');

// Mock node-fetch
jest.mock('node-fetch', () => jest.fn());

describe('Express App', () => {
  beforeAll(() => {
    process.env.PORT = 3001;
  });

  afterAll((done) => {
    // Close the server properly
    server.close(done);
  });

  describe('GET /data', () => {
    it('should return JSON with a random number between 0 and 99', async () => {
      const response = await request(app).get('/data');

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('number');
      expect(typeof response.body.number).toBe('number');
      expect(response.body.number).toBeGreaterThanOrEqual(0);
      expect(response.body.number).toBeLessThan(100);
    });
  });

  describe('GET /', () => {
    beforeEach(() => {
      fetch.mockClear();
    });

    it('should return HTML with a random number when data fetch succeeds', async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ number: 42 }),
      });

      const response = await request(app).get('/');

      expect(response.statusCode).toBe(200);
      expect(response.text).toContain('<h1>Here is a random number: 42</h1>');
      expect(response.text).toContain('<title>Random Number</title>');
    });

    it('should return 500 error when data fetch fails', async () => {
      fetch.mockRejectedValueOnce(new Error('Network error'));

      const response = await request(app).get('/');

      expect(response.statusCode).toBe(500);
      expect(response.text).toBe('Error fetching data Error: Network error');
    });
  });
});
