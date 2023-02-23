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
    // it("404 GET /api/articles - a path that doesn't exist but is valid format", () => {
    //   return request(app)
    //     .get("/api/arty-gulls")
    //     .expect(404)
    //     .then(({ body }) => {
    //       const message = body.message;
    //       expect(message).toBe("Path not found");
    //     });
    // });
  });
  describe("200 GET /api/topics", () => {
    it("200 GET /api/topics - each object inside array has two properties - a slug, and a description", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({ body }) => {
          const topics = body;
          topics.forEach((topic) => {
            expect(topic).toMatchObject({
              slug: expect.any(String),
              description: expect.any(String),
            });
          });
        });
    });
  });
  describe("200 GET /api/articles", () => {
    it("responds with an object", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then((response) => {
          expect(typeof response.body).toEqual("object");
        });
    });
    it("200 GET /api/articles - each object inside array has eight properties - author, title, article_id, topic, created_at, votes, article_img_url, comment_count. Ordered by desc date order", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body }) => {
          const articles = body;
          expect(articles.length).toBeGreaterThan(0);
          expect(Array.isArray(articles)).toBe(true);
          articles.forEach((article) => {
            expect(article).toMatchObject({
              author: expect.any(String),
              title: expect.any(String),
              article_id: expect.any(Number),
              topic: expect.any(String),
              created_at: expect.any(String),
              votes: expect.any(Number),
              article_img_url: expect.any(String),
              comment_count: expect.any(Number),
            });
            expect(articles).toBeSortedBy("created_at", {
              descending: true,
            });
          });
        });
    });
  });
  describe("201 POST /api/articles/:article_id/comments", () => {
    // it("201 POST /api/articles/:article_id/comments - responds with an object", () => {
    //   const newComment = {
    //     username: "Billy",
    //     body: "best article ever",
    //   };
    //   return request(app)
    //     .post("/api/articles/1/comments")
    //     .send(newComment)
    //     .expect(201)
    //     .then(({ body }) => {
    //       const comment = body;
    //       expect(typeof comment).toBe("object");
    //     });
    // });
    // it("201 POST /api/articles/:article_id/comments - responds with an object containing newly posted comment", () => {
    //   const newComment = {
    //     username: "Billy",
    //     body: "best article ever",
    //   };
    //   return request(app)
    //     .post("/api/articles/1/comments")
    //     .send(newComment)
    //     .expect(201)
    //     .then(({ body }) => {
    //       const comment = body;
    //       expect(comment.username).toBe("Billy");
    //       expect(comment.body).toBe("best article ever");
    //     });
    // });
  });
});
