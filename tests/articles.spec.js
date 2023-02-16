const request = require("supertest");
const { app } = require("../server");
const config = require("../config");
const mongoose = require("mongoose");
const mockingoose = require("mockingoose");
const Article = require("../api/articles/articles.model");
const articlesService = require("../api/articles/articles.service");

describe('GET /api/articles', () => {
    test("[Articles] Get All", async () => {
        const res = await request(app).get("/api/articles")
        expect(res.status).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    });
});

describe("API articles", () => {
    let token;
    const ARTICLE_ID = "fake";
    const MOCK_DATA = [
      {
        _id: ARTICLE_ID,
        title: "ana",
        content: "nfegeg@gmail.com",
        user: "azertyuiop",
        status: "draft"
      },
    ];

    const MOCK_DATA_CREATED = [
        {
          title: "ana",
          content: "nfegeg@gmail.com",
          user: "azertyuiop",
          status: "draft"
        },
      ];
  
    beforeEach(() => {
      token = jwt.sign({ articleId: ARTICLE_ID }, config.secretJwtToken);
      mockingoose(Article).toReturn(MOCK_DATA, "find");
      mockingoose(Article).toReturn(MOCK_DATA_CREATED, "save");
    });
});