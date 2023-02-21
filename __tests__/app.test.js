const request = require("supertest");
const app = require("../app.js");
const seed = require("../db/seeds/seed.js");
const testData = require("../db/data/test-data/");
const db = require("../db/connection.js");

beforeEach(() => {
  return seed(testData);
});

afterAll(() => {
  db.end();
});

describe("app", () => {
  describe("server errors", () => {
    it("404 GET /api/topics - a path that doesn't exist but is valid format", () => {
      return request(app)
        .get("/api/chopics")
        .expect(404)
        .then((body) => {
          const message = body.body.message;
          expect(message).toBe("Path not found");
        });
    });
  });
  describe("/api", () => {
    it('200 GET /api returns message, "all ok"', () => {
      return request(app)
        .get("/api")
        .expect(200)
        .then((response) => {
          expect(response.body.message).toBe("all ok");
        });
    });
  });
  describe("200 GET /api/topics", () => {
    it("responds with an object", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then((response) => {
          expect(typeof response.body).toEqual("object");
        });
    });
    it("200 GET /api/topics - each object inside array has two properties - a slug, and a description", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then((body) => {
          const topics = body.body;
          topics.forEach((topic) => {
            expect(topic).toMatchObject({
              slug: expect.any(String),
              description: expect.any(String),
            });
          });
        });
    });
  });
});
