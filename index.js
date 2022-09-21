const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(morgan("dev"));
// app.use(express.static(__dirname + "/public"));

// parses json bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("HELLLOOOOO BUDDDY");
});
// app.get("/", (req, res) => {
//   res.redirect("/posts");
// });

const PORT = 1337;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
