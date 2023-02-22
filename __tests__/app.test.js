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
    //       expect(message).toBe("no articles here");
    //     });
    // });
    it("404 GET /api/articles/:article_id/comments - a path that doesn't exist but is valid format", () => {
      return request(app)
      .get("/api/articles/100000/comments")
      .expect(404)
      .then(({ body }) => {
        const message = body.message
        expect(message).toBe("no article or associated comments here")
      })
    })
    it("400 GET /api/articles/:article_id/comments - bad request / wrong format endpoint", () => {
      return request(app)
      .get("/api/articles/word-not-number/comments")
      .expect(400)
      .then(({ body }) => {
        const message = body.message
        expect(message).toBe("Bad request")
      })
    })
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
    it("returns with an object", () => {
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
  describe("GET /api/articles/:article_id/comments", () => {
    it("responds with an array", () => {
      return request(app)
        .get("/api/articles/1/comments")
        .expect(200)
        .then(({ body }) => {
          const comments = body;
          expect(Array.isArray(comments)).toBe(true);
          expect(comments.length).toBeGreaterThan(0);
        });
    });
    it("responds with an array of comments for specific article_id, most recent comment first", () => {
      return request(app)
        .get("/api/articles/1/comments")
        .expect(200)
        .then(({ body }) => {
          const comments = body;
          comments.forEach(comment => {
            expect(comment).toMatchObject({
              comment_id: expect.any(Number),
              votes: expect.any(Number),
              created_at: expect.any(String),
              author: expect.any(String),
              body: expect.any(String),
              article_id: expect.any(Number),
            });
          })

          expect(comments).toBeSortedBy('created_at', {
            descending: true
          })
        });
    });
  });
});
