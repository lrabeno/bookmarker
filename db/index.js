const Sequelize = require("sequelize");

const DB_URL = process.env.DB_URL || "postgres://localhost/bookmarker";
const db = new Sequelize(DB_URL);

// const pg = require("pg");
// const client = new pg.Client("postgres://localhost/bookmarker");

// client.connect();

const User = db.define("user", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

const Post = db.define("post", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  content: {
    type: Sequelize.TEXT,
  },
});

User.hasMany(Post);
Post.belongsTo(User);

module.exports = {
  db,
  User,
  Post,
};
