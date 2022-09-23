const express = require("express");
const morgan = require("morgan");
const app = express();
const { Post, User, Bookmark, Category } = require("./db");

app.use(morgan("dev"));
// app.use(express.static(__dirname + "/public"));

// parses json bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(require("method-override")("_method"));

app.get("/", (req, res) => {
  res.redirect("/bookmark");
});

app.get("/bookmark", async (req, res, next) => {
  try {
    const bookmarks = await Bookmark.findAll({
      include: [Category],
    });

    res.send(
      `
         <body>
            ${bookmarks
              .map(
                (bookmark) =>
                  `<div>
                    <h2>
                      ${bookmark.name} - <a href="categories/${bookmark.categoryId}">${bookmark.category.name}</a>
                    </h2>
                    <a href="${bookmark.url}">${bookmark.url}</a>
                    <form method='POST' action='/bookmark/${bookmark.id}?_method=DELETE'>
                          <button>Delete Bookmark:</button>
                          </form>
                  </div>`
              )
              .join("")}
                  <form method="post" action="/bookmark">
                    <input type="text" placeholder="Name" name="name" />
                    <input type="text" placeholder="url" name="url" />
                    <input type="text"placeholder="category"name="category"/>
                    <button type="submit">Add Bookmark</button>
                  </form>
          </body>
    `
    );
  } catch (error) {
    next(error);
  }
});

app.post("/bookmark", async (req, res, next) => {
  const category = await Category.findOne({
    where: {
      name: req.body.category,
    },
  });
  try {
    res.send(
      await Bookmark.create({
        name: req.body.name,
        url: req.body.url,
        categoryId: category.id,
      })
    );
  } catch (error) {
    next(error);
  }
});

app.delete("/bookmark/:id", async (req, res, next) => {
  try {
    const bookmark = await Bookmark.findByPk(req.params.id);
    if (!bookmark) {
      res.sendStatus(404);
    } else {
      await bookmark.destroy();
      // res.sendStatus(204); WHY CANT I SEND STATUS AND REDIRECT?
      res.redirect("/");
    }
  } catch (error) {
    next(error);
  }
});

app.get("/categories/:id", async (req, res, next) => {
  try {
    const categories = await Category.findAll({
      include: [Bookmark],
    });
    const singleCategory = categories.find(
      (categorie) => categorie.id === +req.params.id
    );
    // console.log("single categorieeee ----->", singleCategory);
    res.send(
      `
         <body>
           <h1>${singleCategory.name}</h1>
           <h2>${singleCategory.bookmarks
             .map((bookmark) => `<li>${bookmark.name}</li>`)
             .join("")}</h2>
             <a href="/bookmark">Back</a>
          </body>
    `
    );
  } catch (error) {
    next(error);
  }
});

const PORT = 1337;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
