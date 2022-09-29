const User = require("./user");
const Bookmark = require("./bookmark");
const Category = require("./category");
const Post = require("./post");

Bookmark.belongsTo(Category);
Category.hasMany(Bookmark);

User.hasMany(Post);
Post.belongsTo(User);

module.exports = {
  User,
  Bookmark,
  Category,
  Post,
};
