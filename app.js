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

app.get("/edit/:id", async (req, res) => {
  const user = await UserModel.findById({ _id: req.params.id });
  console.log(user);
  res.render("update", { user });
});

app.post("/update/:id", async (req, res) => {
  const { name, email, imageURL } = req.body;
  console.log(req.body);
  const user = await UserModel.findByIdAndUpdate(
    { _id: req.params.id },
    { name, email, imageURL },
    { new: true }
  );
  console.log(user);

  res.redirect("/read");
});

// delete a user by its id

app.get("/delete/:id", async (req, res) => {
  const user = await UserModel.findByIdAndDelete({ _id: req.params.id });
  console.log("deleted");
  res.redirect("/read");
});
app.listen(3000, (req, res) => {
  console.log("server is running");
});
