const NotFoundError = require("../../errors/not-found");
const UnauthorizedError = require("../../errors/unauthorized");
const jwt = require("jsonwebtoken");
const config = require("../../config");
const usersService = require("./users.service");
const Article = require("../articles/articles.model");

class UsersController {
  async getAll(req, res, next) {
    try {
      const users = await usersService.getAll();
      res.json(users);
    } catch (err) {
      next(err);
    }
  }
  async getById(req, res, next) {
    try {
      const id = req.params.id;
      const user = await usersService.get(id);
      if (!user) {
        throw new NotFoundError();
      }
      res.json(user);
    } catch (err) {
      next(err);
    }
  }
  async getUserArticles(req, res, next) {
    try {
      const userId = req.params.userId;
      const articles = await Article.find().populate({
        path: "user",
        select: "-password",
        match: { user: userId },
      });
      if (!articles) {
        throw new NotFoundError();
      }
      res.json(articles);
    } catch (err) {
      next(err);
    }
  }
  async create(req, res, next) {
    try {
      const user = await usersService.create(req.body);
      user.password = undefined;
      req.io.emit("user:create", user);
      res.status(201).json(user);
    } catch (err) {
      next(err);
    }
  }
  async update(req, res, next) {
    try {
      const id = req.params.id;
      const data = req.body;
      const userModified = await usersService.update(id, data);
      userModified.password = undefined;
      res.json(userModified);
    } catch (err) {
      next(err);
    }
  }
  async delete(req, res, next) {
    try {
      const id = req.params.id;
      await usersService.delete(id);
      req.io.emit("user:delete", { id });
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await usersService.checkPasswordUser(email, password);
      if (!user) {
        throw new UnauthorizedError();
      }
      const token = jwt.sign({ id: user._id, name: user.name, email: user.email, role: user.role }, config.secretJwtToken, {
        expiresIn: "3d",
      });
      res.json({
        token,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new UsersController();
