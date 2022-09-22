const { db, User, Post, Bookmark, Category } = require("./db");

const seedDb = async () => {
  /* Conencts to your database and clears everything out. Like DROP TABLE IF EXISTS */
  await db.sync({ force: true });

  const louis = await User.create({
    name: "Louis",
  });

  const ben = await User.create({
    name: "Ben",
  });

  const coding = await Category.create({
    name: "coding",
  });

  const search = await Category.create({
    name: "search",
  });

  const jobs = await Category.create({
    name: "jobs",
  });

  await Bookmark.create({
    name: "Google",
    url: "https://www.google.com/",
    categoryId: search.id,
  });

  await Bookmark.create({
    name: "Stack Overflow",
    url: "https://stackoverflow.com/",
    categoryId: coding.id,
  });

  await Bookmark.create({
    name: "Bing",
    url: "https://www.bing.com/",
    categoryId: search.id,
  });

  await Bookmark.create({
    name: "Linkedin",
    url: "https://www.linkedin.com/",
    categoryId: jobs.id,
  });

  await Bookmark.create({
    name: "Indeed",
    url: "https://www.indeed.com/",
    categoryId: jobs.id,
  });

  await Bookmark.create({
    name: "MDN",
    url: "https://developer.mozilla.org/en-US/",
    categoryId: coding.id,
  });

  // DEMO CODE
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
