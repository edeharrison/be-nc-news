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
    it("404 GET api/invalid-route responds with a 404 - Not found/ It could exist as it's the right format, but it doesn't)", () => {
      return request(app).get("/api/invalidRoute").expect(404);
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
        .then((body) => {
          const articles = body.body;
          console.log(articles);
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
            // START - Check ORDER BY created_at DESC
            const createdAtArray = () => {
              return articles.map((article) => {
                article = article.created_at;
                article = article.replace("-", "");
                article = article.slice(0, 6);
                return Number(article);
              });
            };
            const sortedCreatedAtArray = articles.map((article) => {
              article = article.created_at;
              article = article.replace("-", "");
              article = article.slice(0, 6);
              return Number(article);
            });
            expect(sortedCreatedAtArray.sort((b, a) => a - b)).toEqual(
              createdAtArray()
            );
            // END - Check ORDER BY created_at DESC
          });
        });
    });
    // it('400 GET api/?!?! responds with a 400 - Bad request / wrong format)', () => {
    //     return request(app)
    //     .get('/api/?!?!')
    //     .expect(400)
    // })
    // it('408 GET api/articles responds with a 408 - Request timeout', () => {
    //     return request(app)
    //     .get('/api/articles')
    //     .expect(408)
    // })
  });
});
