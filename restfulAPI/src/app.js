const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
require("./db/conn")
const Student = require("./models/students")

app.use(express.json())

// crate a new student

app.post("/students", (req, res) => {
    console.log(req.body);
    const user = new Student(req.body)
     user.save().then(() => {
       res.status(201).send(user)
     }).catch((e) => {
        res.status(400).send(e);
     })

    res.send(user)
});
 
app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
