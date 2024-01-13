const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
const port = process.env.PORT || 8000;
const db = require("./db/conn.js");
const User = require("./models/registers.js");
// const userRouter = require("./router/router.js")

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(userRouter)

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

// app.use(express.static(static_path));

app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);

app.get("/home", (req, res) => {
  res.render("index");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/register", async (req, res) => {
  try {
    const password = req.body.password;

    if (password) {
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        gender: req.body.gender,
      });
      const registered = await newUser.save();
      console.log(registered);
      res.status(201).render("index");
    } else {
      res.send("Enter a password");
    }
  } catch (e) {
    res.status(400).send(e);
  }
});

// log in check

app.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const userEmail = await User.findOne({ email: email });

    if (userEmail.password === password) {
      res.status(201).render("index");
    } else {
      res.send("Invalid email or password");
    }
  } catch (error) {
    res.status(400).send("Invalid email or password");
  }
});

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
