const NotFoundError = require("../../errors/not-found");
const UnauthorizedError = require("../../errors/unauthorized");
const jwt = require("jsonwebtoken");
const config = require("../../config");
const articlesService = require("./articles.service");

class ArticlesController {
  async getAll(req, res, next) {
    try {
      const articles = await articlesService.getAll();
      res.json(articles);
    } catch (err) {
      next(err);
    }
  }
  async getById(req, res, next) {
    try {
      const id = req.params.id;
      const article = await articlesService.get(id);
      if (!article) {
        throw new NotFoundError();
      }
      res.json(article);
    } catch (err) {
      next(err);
    }
  }
  async create(req, res, next) {
    try {
      const article = await articlesService.create({ user: req.user.id, ...req.body });
      //req.io.emit("article:create", article);
      res.status(201).json(article);
    } catch (err) {
      next(err);
    }
  }
  async update(req, res, next) {
    try {
      if (req.user.role !== 'admin') {
        const id = req.params.id;
        const data = req.body;
        const articleModified = await articlesService.update(id, data);
        res.json(articleModified);
      } else {
        throw new UnauthorizedError();
      }
    } catch (err) {
      next(err);
    }
  }
  async delete(req, res, next) {
    try {
      if (req.user.role !== 'admin') {
        const id = req.params.id;
        await articlesService.delete(id);
        //req.io.emit("user:delete", { id });
        res.status(204).send();
      } else {
        throw new UnauthorizedError();
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new ArticlesController();
