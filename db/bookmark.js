const Sequelize = require("sequelize");
const db = require("./db");

const Bookmark = db.define("bookmark", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  url: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Bookmark;
