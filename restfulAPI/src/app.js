const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const db = require("./db/conn");
const Student = require("./models/students");
const studentRouter = require("./router/student");
app.use(express.json());
app.use(studentRouter);


app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
