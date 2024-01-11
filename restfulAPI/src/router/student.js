const express = require("express");
const router = new express.Router();
const Student = require("../models/students")
router.get("/nima", (req, res) => {
  res.send("Hello World");
});

// crate a new student

// router.post("/students", (req, res) => {
//   console.log(req.body);
//   const user = new Student(req.body);
//   user
//     .save()
//     .then(() => {
//       res.status(201).send(user);
//     })
//     .catch((e) => {});
// });

router.post("/students", async (req, res) => {
  try {
    const user = new Student(req.body);
    const createUser = await user.save();
    console.log(createUser);
    res.status(201).send(createUser);
  } catch (e) {
    res.status(400).send(e);
  }
});
// read the data for ragistered Studennts

router.get("/students/:name", async (req, res) => {
  try {
    // const studentsData =  await  Student.find()
    // res.send(studentsData)
    const name = req.params.name;
    const studentdata = await Student.find({ name });

    if (!studentdata) {
      return res.status(404).send;
    } else {
      res.send(studentdata);
    }
  } catch (e) {
    res.status(401).send(e);
  }
});

// update the studennts by its id

router.patch("/students/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const updateStudent = await Student.findByIdAndUpdate(_id, req.body, {
      new: true,
    });

    res.send(updateStudent);
  } catch (e) {
    res.status(400).send(e);
  }
});

// delete the studennts by its id

router.delete("/students/:id", async (req, res) => {
  try {
    const deleteStudentnn = await Student.findByIdAndDelete(req.params.id);
    if (!req.params.id) {
      return res.status(400).send();
    }
    res.send(deleteStudentnn);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
