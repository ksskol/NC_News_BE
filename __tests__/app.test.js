const request = require("supertest");
const sorted = require("jest-sorted");
const app = require("../mvc/app");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data/index");
const endpoints = require("../endpoints.json");

afterAll(() => {
  return db.end();
});

beforeEach(() => {
  return seed(data);
});

describe("404 General Not Found Error", () => {
  test("404: When path does not exist", () => {
    return request(app)
      .get("/api/incorrect-path")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("404: Not Found");
      });
  });
});

describe("/api", () => {
  test("GET 200: Returns identical information from the endpoint's JSON", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body }) => {
        const { endpoints } = body;
        expect(typeof endpoints).toBe("object");
        expect(endpoints.hasOwnProperty("GET /api")).toBe(true);
        expect(endpoints.hasOwnProperty("GET /api/topics")).toBe(true);
        expect(endpoints.hasOwnProperty("GET /api/articles")).toBe(true);
      });
  });
});

describe("/api/topics", () => {
  test("GET 200: Return topics", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        const { topics } = body;
        expect(topics.length).toBe(3);
        topics.forEach((topic) => {
          expect(typeof topic.description).toBe("string");
          expect(typeof topic.slug).toBe("string");
        });
      });
  });
});

describe("/api/articles/:article_id", () => {
  test("GET 200: Returns with an article object", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then(({ body }) => {
        const { article } = body;
        expect(article).toMatchObject({
          article_id: 1,
          title: "Living in the shadow of a great man",
          topic: "mitch",
          author: "butter_bridge",
          body: "I find this existence challenging",
          created_at: "2020-07-09T20:11:00.000Z",
          votes: 100,
          article_img_url:
            "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
        });
      });
  });
  test("GET 400: Invalid id ", () => {
    return request(app)
      .get("/api/articles/two")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toEqual("400: Bad Request");
      });
  });

  test("GET 404: Valid but non-existent id", () => {
    return request(app)
      .get("/api/articles/777")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toEqual("404: Article Not Found");
      });
  });
});

describe("/api/articles", () => {
  test("GET 200: Returns an array includes all articles along with the number of comments for each", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        const { articles } = body;

        expect(articles.length).toBe(13);

        articles.forEach((article) => {
          expect(article).toMatchObject({
            author: expect.any(String),
            title: expect.any(String),
            article_id: expect.any(Number),
            topic: expect.any(String),
            created_at: expect.any(String),
            article_img_url: expect.any(String),
            votes: expect.any(Number),
            comment_count: expect.any(Number),
          });
          expect(article.body).toBeUndefined();
        });
      });
  });
  test("GET 200: Returns articles sorted by date in descending order", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        const { articles } = body;
        expect(articles).toBeSortedBy("created_at", { descending: true });
      });
  });
});

describe("/api/articles/:article_id/comments", () => {
  test("GET 200: Returns an array of all comments for the given article_id ", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then(({ body }) => {
        const { comments } = body;

        expect(comments.length).toBe(11);

        comments.forEach((comment) => {
          expect(comment).toMatchObject({
            comment_id: expect.any(Number),
            votes: expect.any(Number),
            created_at: expect.any(String),
            author: expect.any(String),
            body: expect.any(String),
            article_id: 1,
          });
        });
      });
  });
  test("GET 200: Returns with an array of comments served with the most recent first", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then(({ body }) => {
        const { comments } = body;
        expect(comments).toBeSortedBy("created_at", { descending: true });
      });
  });
  test("GET 200: Responds with an empty array if the article does not have any comments", () => {
    return request(app)
      .get("/api/articles/7/comments")
      .expect(200)
      .then(({ body }) => {
        const { comments } = body;
        expect(comments).toEqual([]);
      });
  });
  test("GET 400: Invalid article id", () => {
    return request(app)
      .get("/api/articles/incorrect-path/comments")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toEqual("400: Bad Request");
      });
  });
  test("GET 404: Valid but non-existent article id", () => {
    return request(app)
      .get("/api/articles/777/comments")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toEqual("404: Article Not Found");
      });
  });
});

describe("POST /api/articles/:article_id/comments", () => {
  test("POST 201: Response with an added comment for an article", () => {
    return request(app)
      .post("/api/articles/1/comments")
      .send({
        username: "icellusedkars",
        body: "Need to stay hydrated",
      })
      .expect(201)
      .then(({ body }) => {
        const { comment } = body;
        expect(comment).toMatchObject({
          comment_id: 19,
          body: "Need to stay hydrated",
          article_id: 1,
          author: "icellusedkars",
          votes: 0,
          created_at: expect.any(String),
        });
      });
  });
  test("POST 400: The format of the request body is incorrect", () => {
    return request(app)
      .post("/api/articles/1/comments")
      .send({
        name: "icellusedkars",
        body: "Need to stay hydrated",
      })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toEqual("400: Bad Request");
      });
  });
  test("POST 400: The username does not exist", () => {
    return request(app)
      .post("/api/articles/1/comments")
      .send({
        username: "ksskol",
        body: "Need to stay hydrated",
      })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toEqual("400: Bad Request");
      });
  });
});
