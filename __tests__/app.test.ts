
const request = require('supertest');
const app = require('../src/app');
describe('GET /', () => {
  it('should return 200 OK', async () => {
    const response = await request(app).get('/');
    expect(response.status);
  });
});