const express = require("express");
const morgan = require("morgan");
const app = express();
const { Post, User, Bookmark, Category } = require("./db");

app.use(morgan("dev"));
// app.use(express.static(__dirname + "/public"));

// parses json bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.get("/", async (req, res, next) => {
//   const posts = await Post.findAll({
//     include: [User],
//   });

//   res.send(
//     `
//        <body>
//           ${posts
//             .map(
//               (post) =>
//                 `<div>
//                   <h2>
//                     ${post.title}
//                   </h2>
//                   <h3>${post.user.name}</h3>
//                   <p>${post.title}</p>
//                 </div>`
//             )
//             .join("")}
//         </body>
//   `
//   );
// });
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
                      ${bookmark.name} - <a href="categories/${bookmark.category.id}">${bookmark.category.name}</a>
                    </h2>
                    <a href="${bookmark.url}">${bookmark.url}</a>
                  </div>`
              )
              .join("")}
          </body>
    `
    );
  } catch (error) {
    next(error);
  }
});

app.post("/bookmark", async (req, res, next) => {
  try {
    res.status(201).send(await Bookmark.create(req.body));
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
