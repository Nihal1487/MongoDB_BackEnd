const express = require("express");
const User = require("../models/registers");
const router  = new express.Router()



router.post("/register", async (req, res) => {
  try {
   
    const password =  req.body.password

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
    }else{
      res.send("Enter a password")
    }
   
  } catch (e) {
    res.status(400).send(e);
  }
});


  module.exports = router