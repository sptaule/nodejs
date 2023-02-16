const express = require("express");
const articlesController = require("./articles.controller");
const router = express.Router();

router.get("/articles", articlesController.getAll);
router.get("/articles/:id", articlesController.getById);
router.post("/article", articlesController.create);
router.put("/article/:id", articlesController.update);
router.delete("/article/:id", articlesController.delete);

module.exports = router;