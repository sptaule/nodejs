const Article = require("./articles.model");
const bcrypt = require("bcrypt");

class ArticleService {
  getAll() {
    return Article.find({});
  }
  get(id) {
    return Article.findById(id);
  }
  create(data) {
    const article = new Article(data);
    return article.save();
  }
  update(id, data) {
    return Article.findByIdAndUpdate(id, data, { new: true });
  }
  delete(id) {
    return Article.deleteOne({ _id: id });
  }
}

module.exports = new ArticleService();
