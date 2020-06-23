const app = require('../../../server/index');
const supertest = require('supertest');
const regeneratorRuntime = require('regenerator-runtime');

describe("Test the root path", () => {
  test("It should response the GET method", done => {
    return supertest(app)
      .get("/api/rooms/1")
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body[0].id).toBe(1);
        done();
      });
  });
});