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
    it("404 GET /api/articles - a path that doesn't exist but is valid format", () => {
      return request(app)
        .get("/api/arty-gulls")
        .expect(404)
        .then(({ body }) => {
          const message = body.message;
          expect(message).toBe("Path not found");
        });
    });
    it("404 GET /api/articles/100000 - a path that doesn't exist but is valid format", () => {
      return request(app)
        .get("/api/articles/100000")
        .expect(404)
        .then(({ body }) => {
          const message = body.message;
          expect(message).toBe("Path not found");
        });
    });
    it("400 GET /api/articles/word-not-number - a bad request / invalid format", () => {
      return request(app)
        .get("/api/articles/word-not-number")
        .expect(400)
        .then(({ body }) => {
          const message = body.message;
          expect(message).toBe("Bad request");
        });
    });
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
  describe("/api/articles/:article_id", () => {
    it("responds with an object", () => {
      return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then((response) => {
          expect(typeof response.body).toEqual("object");
        });
    });
    it("200 GET /api/articles/:article_id - responds with specific article from articles", () => {
      return request(app)
        .get("/api/articles/1")
        .then(({ body }) => {
          const article = body;
          expect(article.author).toBe('butter_bridge')
          expect(article.title).toBe("Living in the shadow of a great man");
          expect(article.article_id).toBe(1)
          expect(article.topic).toBe("mitch");
          expect(article.votes).toBe(100);
          expect(article.article_img_url).toBe('https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700')          
        });
    });
  });
});
