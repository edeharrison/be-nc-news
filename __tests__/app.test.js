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

describe("App", () => {
  describe("Server errors", () => {
    // > I think this test relies on branch 5 to work (which needs reviewing / merging)
    // > I will add back in once that's done
    // ----------
    // it("404 GET /api/articles - a path that doesn't exist but is valid format", () => {
    //   return request(app)
    //     .get("/api/arty-gulls")
    //     .expect(404)
    //     .then(({ body }) => {
    //       const message = body.message;
    //       expect(message).toBe("Path not found");
    //     });
    // });
    // -----------
    // });

    //5
    describe("GET /api/articles/:article_id", () => {
      it("/api/articles/100000 - 404 Error = 'Path not found'", () => {
        return request(app)
          .get("/api/articles/100000")
          .expect(404)
          .then(({ body }) => {
            const message = body.message;
            expect(message).toBe("Path not found");
          });
      });
      it("/api/articles/word-not-number - 400 Error = 'Bad request'", () => {
        return request(app)
          .get("/api/articles/word-not-number")
          .expect(400)
          .then(({ body }) => {
            const message = body.message;
            expect(message).toBe("Bad request");
          });
      });
    });

    //6
    describe("GET /api/articles/:article_id/comments", () => {
      it("/100000/comments - 404 Error = 'no article or associated comments here'", () => {
        return request(app)
          .get("/api/articles/100000/comments")
          .expect(404)
          .then(({ body }) => {
            const message = body.message;
            expect(message).toBe("no article or associated comments here");
          });
      });
      it("/word-not-number/comments - 400 Error = 'Bad request'", () => {
        return request(app)
          .get("/api/articles/word-not-number/comments")
          .expect(400)
          .then(({ body }) => {
            const message = body.message;
            expect(message).toBe("Bad request");
          });
      });
    });

    //7
    describe("POST /api/articles/:article_id/comments", () => {
      it.only("400 Error - 'No username and/or comment submitted'", () => {
        const newComment = { username: undefined, body: undefined };
        return request(app)
          .post("/api/articles/1/comments")
          .send(newComment)
          .expect(400)
          .then(({ body }) => {
            const message = body.message;
            expect(message).toBe("No username and/or comment submitted");
          });
      });
      it.only("404 Error - 'That article does not exist'", () => {
        const newComment = {
          username: "butter_bridge",
          body: "best article ever",
        };
        return request(app)
          .post("/api/articles/111111/comments")
          .send(newComment)
          .expect(404)
          .then(({ body }) => {
            const message = body.message;
            expect(message).toBe("That article does not exist");
          });
      });
    });
  });

    describe("Happy path", () => {
      //3
      describe("GET /api/topics", () => {
        it("200 - each object inside array has two properties - a slug, and a description", () => {
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

      //4
      describe("GET /api/articles", () => {
        it("200 - responds with an object", () => {
          return request(app)
            .get("/api/articles")
            .expect(200)
            .then((response) => {
              expect(typeof response.body).toEqual("object");
            });
        });
        it("200 - each object inside array has eight properties - author, title, article_id, topic, created_at, votes, article_img_url, comment_count. Ordered by desc date order", () => {
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

      //5
      describe("GET /api/articles/:article_id", () => {
        it("/1 - 200 - responds with an object", () => {
          return request(app)
            .get("/api/articles/1")
            .expect(200)
            .then((response) => {
              expect(typeof response.body).toEqual("object");
            });
        });
        it("/1 - 200 - responds with specific article from articles", () => {
          return request(app)
            .get("/api/articles/1")
            .then(({ body }) => {
              const article = body;
              expect(article.author).toBe("butter_bridge");
              expect(article.title).toBe("Living in the shadow of a great man");
              expect(article.article_id).toBe(1);
              expect(article.topic).toBe("mitch");
              expect(article.votes).toBe(100);
              expect(article.article_img_url).toBe(
                "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700"
              );
            });
        });
      });

      //6
      describe("GET /api/articles/:article_id/comments", () => {
        it("/1/comments - 200 - responds with an array", () => {
          return request(app)
            .get("/api/articles/1/comments")
            .expect(200)
            .then(({ body }) => {
              const comments = body;
              expect(Array.isArray(comments)).toBe(true);
              expect(comments.length).toBe(11);
            });
        });
        it("/1/comments - 200 - responds with an array of comments for specific article_id, most recent comment first", () => {
          return request(app)
            .get("/api/articles/1/comments")
            .expect(200)
            .then(({ body }) => {
              const comments = body;
              comments.forEach((comment) => {
                expect(comment).toMatchObject({
                  comment_id: expect.any(Number),
                  votes: expect.any(Number),
                  created_at: expect.any(String),
                  author: expect.any(String),
                  body: expect.any(String),
                  article_id: expect.any(Number),
                });
              });
              expect(comments).toBeSortedBy("created_at", {
                descending: true,
              });
            });
        });
        it("/8/comments - 200 - if no comments, responds with an empty array", () => {
          return request(app)
            .get("/api/articles/8/comments")
            .expect(200)
            .then(({ body }) => {
              const comments = body;
              expect(comments.length).toBe(0);
            });
        });
      });

      //7
      describe("201 POST /api/articles/:article_id/comments", () => {
        it.only("201 POST /api/articles/1/comments - responds with an object", () => {
          const newComment = {
            username: "butter_bridge",
            body: "best article ever",
          };
          return request(app)
            .post("/api/articles/1/comments")
            .send(newComment)
            .expect(201)
            .then(({ body }) => {
              const comment = body;
              expect(typeof comment).toBe("object");
            });
        });
        // it("201 POST /api/articles/:article_id/comments - responds with an object containing newly posted comment", () => {
        //   const newComment = {
        //     username: "butter_bridge",
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
  });

