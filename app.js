const express = require("express");
const { engine } = require("express-handlebars");

require("dotenv").config();

const app = express();

//parsing middleware
//parse application

app.use(express.urlencoded({ extended: true }));
//parse application/json

app.use(express.static("public"));

//static files are served
app.use(express.json());

//templating engine
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
  })
);
app.set("view engine", "hbs");
// app.set("views", __dirname + "/views");

const route = require("./server/routes/user");
app.use("/", route);

app.listen(3001, () => {
  console.log("running at port 3001");
});
