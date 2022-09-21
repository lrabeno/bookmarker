const { db, User, Post } = require("./db");

const seedDb = async () => {
  /* Conencts to your database and clears everything out. Like DROP TABLE IF EXISTS */
  await db.sync({ force: true });

  const louis = await User.create({
    name: "Louis",
  });

  const ben = await User.create({
    name: "Ben",
  });

  await Post.create({
    title: "Louis post yooo",
    content: "I'm awesome!!!",
    userId: louis.id,
  });

  await Post.create({
    title: "Bensssss post yooo",
    content: "Louis is also awesome!!!",
    userId: ben.id,
  });
  //   console.log(await User.findAll()).map((user) => user.name);
};

seedDb();
