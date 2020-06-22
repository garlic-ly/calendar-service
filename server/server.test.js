const app = require('./index.js');
const supertest = require('supertest');
const regeneratorRuntime = require('regenerator-runtime');
const request = supertest(app);

it('Reaches the room endpoint and returns the expected Id', async (done) => {
  const response = await request.get('/api/rooms/1');

  expect(response.status).toBe(200);
  expect(response.body[0].id).toBe(1);
  done();
});