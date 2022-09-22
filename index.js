const express = require("express");
const morgan = require("morgan");
const app = express();
const { Post, User } = require("./db");

app.use(morgan("dev"));
// app.use(express.static(__dirname + "/public"));

// parses json bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res, next) => {
  const posts = await Post.findAll({
    include: [User],
  });

  res.send(
    `
       <body>
          ${posts
            .map(
              (post) =>
                `<div>
                  <h2>
                    ${post.title}
                  </h2>
                  <h3>${post.user.name}</h3>
                  <p>${post.title}</p>
                </div>`
            )
            .join("")}
        </body>
  `
  );
});
// app.get("/", (req, res) => {
//   res.redirect("/posts");
// });

const PORT = 1337;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
