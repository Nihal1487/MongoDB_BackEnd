require("dotenv").config()
const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
const port = process.env.PORT || 8000;
const db = require("./db/conn.js");
const User = require("./models/registers.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser")
// const userRouter = require("./router/router.js")

app.use(express.json());
app.use(cookieParser())
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

app.get("/secret", (req, res) => {
  console.log(`this is the cookie ${req.cookies.jwt}`);
  res.render("secret");
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

      const token = await newUser.gTokenn();
      console.log("the token part  " + token);

    // cookie
 
     res.cookie("jwt", token , {
      expires: new Date(Date.now() + 30000),
      httpOnly: true
     })
    

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
    const isMatch = await bcrypt.compare(password, userEmail.password);

    const token = await userEmail.gTokenn();
    console.log("the token part  " + token);
   
     
    res.cookie("jwt", token , {
      expires: new Date(Date.now() + 60000),
      httpOnly: true
     })
   
 

    if (isMatch) {
      res.status(201).render("index");
    } else {
      res.send("Invalid email or password");
    }
  } catch (error) {
    res.status(400).send("Invalid email or password");
  }
});

// const securePassword = async (password) => {
//   const passwordHash = await bcrypt.hash(password, 10);
//   console.log(passwordHash);

//   const passwordmatch = await bcrypt.compare(password, passwordHash);
//   console.log(passwordmatch);
// };

// securePassword("1569");

// const jwt = require("jsonwebtoken")

// // createTokenn

// const createToken = async () =>{
//   const token = await   jwt.sign({_id:"65a1375458cdbb1ae016e743"},"qwuehdcujeuifjrugiwifififujetguewjdj3ejdieidi3ekdjkejdjejdejd", {expiresIn: "2 seconds" })
//   console.log(token);

//   const userVerify =  jwt.verify(token,"qwuehdcujeuifjrugiwifififujetguewjdj3ejdieidi3ekdjkejdjejdejd")

//   console.log(userVerify);
// }

// createToken()

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
