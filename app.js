const express = require("express");
const app = express();
const path = require("path");

const UserModel = require("./models/user.models");
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/read", async (req, res) => {
  const allUsers = await UserModel.find();
  res.render("read", { users: allUsers });
});

app.post("/create", async (req, res) => {
  console.log(req.body);
  const { name, email, imageURL } = req.body;
  const newUser = await UserModel.create({
    name,
    email,
    imageURL,
  });
  res.redirect("/read");
});

app.listen(3000, (req, res) => {
  console.log("server is running");
});
