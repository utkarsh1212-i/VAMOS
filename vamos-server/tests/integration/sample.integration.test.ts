import request from 'supertest';
import app from '../../src/app';

describe('Sample Route - /api/sample', () => {
  it('should return a 200 and valid response', async () => {
    const response = await request(app).get('/api/sample');
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('message', 'Sample endpoint working!');
  });
});