const express = require("express")
const router = new express.Router()
const Racer = require("../model/model")




router.post("/racers", async (req, res) => {
    try {
      const user = new Racer(req.body);
      const createUser = await user.save();
      console.log(createUser);
      res.status(201).send(createUser);
    } catch (e) {
      res.status(400).send(e);
    }
  });



  router.get("/racers", async (req, res) => {
    try {   
      const findUser = await Racer.find().sort({"ranking":1})

      res.status(201).send(findUser);
    } catch (e) {
      res.status(400).send(e);
    }
  });

  

  router.patch("/racers/:id", async (req, res) => {
    try {   
      const updateUser = await Racer.findByIdAndUpdate(req.params.id,req.body,{
        new : true
      })
      res.status(201).send(updateUser);
    } catch (e) {
      res.status(400).send(e);
    }
  });


router.delete("/racers/:id", async (req, res) => {
    try {
     const deleteUser  = await Racer.findByIdAndDelete(req.params.id)
     if (!req.params.id) {
        return  res.status(401).send();
     }
     res.send(deleteUser);
    } catch (e) {
      res.status(400).send(e);
    }
  });

  module.exports = router