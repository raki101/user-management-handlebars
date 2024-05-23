const express = require("express");
const app = express.Router();
const userController = require("../controllers/userController");

app.get("/", userController.view);
app.post("/", userController.find);
app.get("/adduser", userController.form);
app.post("/adduser", userController.create);
app.get("/edit/:id", userController.edit);
app.post("/edit/:id", userController.update);
app.get("/view/:id", userController.viewid);

app.get("/:id", userController.delete);
// app.get("/me", userController.me);

module.exports = app;
