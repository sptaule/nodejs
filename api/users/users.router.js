const express = require("express");
const usersController = require("./users.controller");
const router = express.Router();

router.get("/users", usersController.getAll);
router.get("/user/:id", usersController.getById);
router.get("/users/:id/articles", usersController.getAllArticles);
router.post("/user", usersController.create);
router.put("/user/:id", usersController.update);
router.delete("/user/:id", usersController.delete);

module.exports = router;